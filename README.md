# flashcard-app
flashcard app developed with React + Vite, FastAPI, and MySQL

# learning flashcards
users can create, view, edit, and delete flashcards to help with study

# features 
- **User Registration & Login** with JWT authentication and bcrypt password hashing
- **Create** flashcards with a question and answer
- **View** all flashcards in a responsive 3-column grid layout
- **Edit** existing flashcards via a modal form
- **Delete** flashcards you no longer need
- **Show/Hide** answers with a single click
- **Live Search** — filters flashcards in real-time as you type 
- **View History** — automatically tracks which flashcards a user has viewed
- **Admin Panel** — view all users and their learning history
- All data persisted in a **MySQL database**
- Fast and responsive **Single Page Application (SPA)**

# tech stack

| Layer            | Technology                              |
|------------------|-----------------------------------------|
| Frontend         | React + Vite                            |
| Backend          | FastAPI (Python)                        |
| Datebase         | MySQL                                   |
| Authentication   | JWT (python-jose)                       |
| Password Hashing | bcrypt (passlib)                        |
| Styling          | CSS (Poppins font, yellow/orange theme) |

# running code
### 1. Database Setup
- Open **MySQL Workbench**
- Run the following SQL:

#### flashcard.sql
```sql
CREATE DATABASE IF NOT EXISTS flashcard_app;

USE flashcard_app;

-- users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- view history table
CREATE TABLE IF NOT EXISTS view_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    flashcard_id INT NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE
);

-- add user ownership to flashcards
ALTER TABLE flashcards 
ADD COLUMN user_id INT,
ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```
#### create_table.sql
``` sql
USE flashcard_app;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS view_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    flashcard_id INT NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id) REFERENCES flashcards(id) ON DELETE CASCADE
);
```
#### alter_flashcards.sql
``` sql
USE flashcard_app;
ALTER TABLE flashcards ADD COLUMN user_id INT;
```

#### set_admin.sql
``` sql
USE flashcard_app;
UPDATE users SET is_admin = TRUE WHERE username = 'sam';
```

#### check_users.sql
``` sql
USE flashcard_app;
SELECT id, username, email, is_admin FROM users;
```

### 2. Backend Setup
```bash
cd backend
pip install fastapi uvicorn mysql-connector-python python-jose[cryptography] passlib bcrypt==4.0.1 python-multipart python-dotenv
uvicorn main:app --reload
```
Backend runs at: http://127.0.0.1:8000

### 3. Environment Variables
Create a `.env` file inside the `backend` folder:
DB_PASSWORD=Samn0480$
SECRET_KEY=flashcard_secret_key_2026

### 4. Frontend Setup
```bash
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

### 5. Create an Admin Account
- Register a new account through the app
- Then run in MySQL Workbench:
```sql
UPDATE users SET is_admin = TRUE WHERE username = '';
```
---

## Folder Structure

flashcard-app/
├── backend/
│   ├── main.py                 # FastAPI backend with all routes
│   ├── .env                    # Environment variables (not in GitHub)
│   └── .gitignore              # Hides .env from GitHub
├── database/
│   ├── flashcard_app.sql       # Full database export
│   ├── create_tables.sql       # Table creation scripts
│   ├── alter_flashcards.sql    # Alter flashcards table
│   ├── set_admin.sql           # Set admin user script
│   └── check_users.sql         # Check users query
├── node_modules
├── public/
├── src/
│   ├── assests/
│   ├── components/
│   │   ├── Flashcard.jsx       # Individual flashcard component
│   │   └── FlashcardForm.jsx   # Add/Edit modal form (React Portal)
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   └── Admin.jsx           # Admin dashboard
│   ├── App.jsx                 # Main app with routing and state
│   ├── index.css               # Global styles
│   └── main.jsx                # React entry point
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

---

## Security

- Passwords are hashed using **bcrypt** before storing in the database
- Authentication uses **JWT tokens** with 60 minute expiry
- Every protected API route validates the JWT token
- Sensitive credentials stored in **`.env`** file excluded from GitHub
- Admin routes protected by `is_admin` check in JWT payload

---

## Challenges faced
1. **JWT Authentication** — Implementing secure login with token-based auth required careful handling of token expiry, protected routes, and passing tokens with every API request via the Authorization header.

2. **bcrypt Compatibility** — Resolved a version conflict between bcrypt 5.0 and passlib by downgrading to bcrypt 4.0.1 which restored password hashing functionality.

3. **Live Search with Debouncing** — Implemented a 300ms debounce on the search input using `setTimeout` and `clearTimeout` in a `useEffect` hook to avoid sending too many API requests while the user is typing.

4. **CORS Configuration** — Connecting the React frontend to the FastAPI backend required setting up CORSMiddleware to allow cross-origin requests between localhost:5173 and localhost:8000.

5. **React Portal Modal** — Implementing the flashcard form as a React Portal using `createPortal` ensured the modal rendered correctly above all other content regardless of CSS stacking context.

6. **Database Relations** — Setting up foreign key relationships between users, flashcards, and view_history tables required careful ordering of table creation and handling of cascade deletes.

---

## Workload Allocation

This assignment was done individual **Samnang Vyvath Khun** (Student ID: 24594828).

All files I have written:

File & Description                            
- `src/App.jsx` - Main app routing and state management 
- `src/components/Flashcard.jsx` - Flashcard display component           
- `src/components/FlashcardForm.jsx` - Add/Edit modal form                   
- `src/pages/Login.jsx` - Login page                            
- `src/pages/Register.jsx` - Registration page                     
- `src/pages/Admin.jsx` - Admin dashboard                       
- `backend/main.py` - FastAPI backend with all routes       
- `database/*.sql` - Database schema and setup             

---

