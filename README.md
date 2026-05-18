# flashcard-app
flashcard app developed with React + Vite, FastAPI, and MySQL

# learning flashcards
users can create, view, edit, and delete flashcards to help with study

# features 
**Create** flashcards with a question and answer
**View** all flashcards in a responsive grid layout
**Edit** existing flashcards
**Delete** flashcards you no longer need
**Show/Hide** answers with a single click
all data is **persisted in a MySQL database**

# tech stack
Frontend - React + Vite 
Backend - FastAPI (Python) 
Database - MySQL 
Styling - CSS (Poppins font, yellow/orange color) 

# running code
### 1. Database Setup
- Open **MySQL Workbench**
- Run the following SQL:
```sql
CREATE DATABASE IF NOT EXISTS flashcard_app;
USE flashcard_app;
CREATE TABLE IF NOT EXISTS flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 2. Backend Setup
```bash
cd backend
pip install fastapi uvicorn mysql-connector-python
uvicorn main:app --reload
```
Backend runs at: http://127.0.0.1:8000
### 3. Frontend Setup
```bash
npm install
npm run dev
```
Frontend runs at: http://localhost:5173
---

---
## Challenges faced
1. **CORS Configuration** — Connecting the React frontend to the FastAPI backend required setting up CORS middleware to allow cross-origin requests between localhost:5173 and localhost:8000.

2. **React State Management** — Managing the edit and create states together in a single form component required careful use of useState and useEffect hooks to sync form fields with the selected card.

3. **Portal-based Modal** — Implementing the flashcard form as a React Portal ensured the modal rendered correctly above all other content regardless of CSS stacking context.

4. **MySQL Integration** — Connecting FastAPI to MySQL using mysql-connector-python and handling database connections cleanly for each request was a key learning point.
---

