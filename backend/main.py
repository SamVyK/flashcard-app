from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import mysql.connector
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext

app = FastAPI()

#allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#JWT Config
SECRET_KEY = "flashcard_secret_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

#password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#database connection
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Samn0480$",
        database="flashcard_app"
    )

#models
class UserRegister(BaseModel):
    username: str
    email: str
    password: str

class FlashcardCreate(BaseModel):
    question: str
    answer: str

class Token(BaseModel):
    access_token: str
    token_type: str

#authentication utils
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        is_admin = payload.get("is_admin")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"user_id": user_id, "is_admin": is_admin}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

##authentication routes
#register
@app.post("/register")
def register(user: UserRegister):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email=%s OR username=%s", (user.email, user.username))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Username or email already exists")
    hashed = hash_password(user.password)
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (user.username, user.email, hashed))
    db.commit()
    cursor.close()
    db.close()
    return {"message": "User registered successfully"}

#login 
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username=%s", (form_data.username,))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token({"user_id": user["id"], "username": user["username"], "is_admin": user["is_admin"]})
    return {"access_token": token, "token_type": "bearer", "username": user["username"], "is_admin": user["is_admin"], "user_id": user["id"]}

##flashcard CRUD routes
#read flashcards with optional search
@app.get("/flashcards")
def get_flashcards(search: str = "", current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    if search:
        cursor.execute("SELECT * FROM flashcards WHERE user_id=%s AND (question LIKE %s OR answer LIKE %s)", (current_user["user_id"], f"%{search}%", f"%{search}%"))
    else:
        cursor.execute("SELECT * FROM flashcards WHERE user_id=%s", (current_user["user_id"],))
    results = cursor.fetchall()
    cursor.close()
    db.close()
    return results

#create flashcard
@app.post("/flashcards")
def create_flashcard(card: FlashcardCreate, current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO flashcards (question, answer, user_id) VALUES (%s, %s, %s)", (card.question, card.answer, current_user["user_id"]))
    db.commit()
    new_id = cursor.lastrowid
    cursor.close()
    db.close()
    return {"id": new_id, "question": card.question, "answer": card.answer}

#update flashcard
@app.put("/flashcards/{card_id}")
def update_flashcard(card_id: int, card: FlashcardCreate, current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE flashcards SET question=%s, answer=%s WHERE id=%s AND user_id=%s", (card.question, card.answer, card_id, current_user["user_id"]))
    db.commit()
    cursor.close()
    db.close()
    return {"id": card_id, "question": card.question, "answer": card.answer}

#delete flashcard
@app.delete("/flashcards/{card_id}")
def delete_flashcard(card_id: int, current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM flashcards WHERE id=%s AND user_id=%s", (card_id, current_user["user_id"]))
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Flashcard deleted"}

#view history routes
#log a view
@app.post("/flashcards/{flashcard_id}/views")
def log_view(flashcard_id: int, current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO view_history (user_id, flashcard_id) VALUES (%s, %s)", (current_user["user_id"], flashcard_id))
    db.commit()
    cursor.close()
    db.close()
    return {"message": "View logged"}

#admin get all history of users
@app.get("/admin/history")
def get_all_history(current_user: dict = Depends(get_current_user)):
    if not current_user["is_admin"]:
        raise HTTPException(status_code=403, detail="Admins only")
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT u.username, f.question, v.viewed_at
        FROM view_history v
        JOIN users u ON v.user_id = u.id
        JOIN flashcards f ON v.flashcard_id = f.id
        ORDER BY v.viewed_at DESC
    """)
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return result

#admin get all users
@app.get("/admin/users")
def get_all_users(current_user: dict = Depends(get_current_user)):
    if not current_user["is_admin"]:
        raise HTTPException(status_code=403, detail="Admins only")
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id, username, email, is_admin, created_at FROM users")
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return result

