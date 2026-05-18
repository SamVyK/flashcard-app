from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

#allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#database connection
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Samn0480$",
        database="flashcard_app"
    )

#flashcard model
class Flashcard(BaseModel):
    question: str
    answer: str

#read - get all cards
@app.get("/flashcards")
def read_flashcards():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM flashcards")
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return result

#create - add new card
@app.post("/flashcards")
def create_flashcard(card: Flashcard):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO flashcards (question, answer) VALUES (%s, %s)", (card.question, card.answer))
    db.commit()
    new_id = cursor.lastrowid
    cursor.close()
    db.close()
    return {"id": new_id, "question": card.question, "answer": card.answer}

#update - edit existing card
@app.put("/flashcards/{card_id}")
def update_flashcard(card_id: int, card: Flashcard):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE flashcards SET question=%s, answer=%s WHERE id=%s", (card.question, card.answer, card_id))
    db.commit()
    cursor.close()
    db.close()
    return {"id": card_id, "question": card.question, "answer": card.answer}

#delete - remove card
@app.delete("/flashcards/{card_id}")
def delete_flashcard(card_id: int):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM flashcards WHERE id=%s", (card_id,))
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Flashcard deleted"}

