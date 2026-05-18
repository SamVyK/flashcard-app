import { useState, useEffect } from "react";
import Flashcard from "./components/Flashcard";
import FlashcardForm from "./components/FlashcardForm";
import "./index.css";

const API = "http://127.0.0.1:8000";

const styles = {
  container: {
    width: "90vw",
    maxWidth: "62.5em",
    margin: "auto",
    position: "relative",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2em 1em",
  },
  title: {
    fontSize: "1.8em",
    fontWeight: 600,
    color: "#363d55",
  },
  addBtn: {
    fontSize: "1em",
    backgroundColor: "#f5a623",
    color: "#ffffff",
    padding: "0.8em 1.2em",
    fontWeight: 500,
    borderRadius: "0.4em",
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    padding: "0.2em",
    gap: "1.5em",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: "4em",
    fontSize: "1.1em",
  },
  loading: {
    textAlign: "center",
    color: "#f5a623",
    marginTop: "4em",
    fontSize: "1.1em",
  },
};

export default function App() {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all flashcards from backend on startup
  useEffect(() => {
    fetch(`${API}/flashcards`)
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading flashcards:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async ({ question, answer }) => {
    if (editCard) {
      // UPDATE
      const res = await fetch(`${API}/flashcards/${editCard.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const updated = await res.json();
      setCards(cards.map((c) => (c.id === editCard.id ? updated : c)));
      setEditCard(null);
    } else {
      // CREATE
      const res = await fetch(`${API}/flashcards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const newCard = await res.json();
      setCards([...cards, newCard]);
    }
    setShowForm(false);
  };

  const handleEdit = (card) => {
    setEditCard(card);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/flashcards/${id}`, { method: "DELETE" });
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1 style={styles.title}>📇 Flashcard App</h1>
        <button
          style={styles.addBtn}
          onClick={() => {
            setEditCard(null);
            setShowForm(true);
          }}
        >
          + Add Flashcard
        </button>
      </div>

      {loading ? (
        <p style={styles.loading}>Loading flashcards...</p>
      ) : cards.length === 0 ? (
        <p style={styles.empty}>
          No flashcards yet. Click "+ Add Flashcard" to get started!
        </p>
      ) : (
        <div style={styles.grid}>
          {cards.map((card) => (
            <Flashcard
              key={card.id}
              card={card}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <FlashcardForm
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditCard(null);
          }}
          editCard={editCard}
        />
      )}
    </div>
  );
}