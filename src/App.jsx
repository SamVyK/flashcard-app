import { useState } from "react";
import Flashcard from "./components/Flashcard";
import FlashcardForm from "./components/FlashcardForm";
import "./index.css";

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
        fontSize: "4em",
        fontSize: "1.1em",
    },
};

export default function App() {
    const [cards, setCards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editCard, setEditCard] = useState(null);

    const handleSave = ({question, answer}) => {
        if (editCard) {
          setCards(cards.map((c) => c.id === editCard.id ? { ...c, question, answer } : c));
          setEditCard(null);
        } else {
          setCards([...cards, { id: Date.now(), question, answer }]);
        }
        setShowForm(false);
    };

    const handleEdit = (card) => {
        setEditCard(card);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setCards(cards.filter((c) => c.id !== id));
    };
    
    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <h1 style={styles.title}>Flashcards</h1>
                <button style={styles.addBtn} onClick={() => {setEditCard(null);setShowForm(true);}}>
                    + Add Flashcard
                </button>
            </div>
            {cards.length === 0 ? (
                <p style={styles.empty}>No flashcards yet. Click "Add Flashcard" to create one!</p>
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
                    onClose={() => {setShowForm(false);setEditCard(null);}}
                    editCard={editCard}
                />
            )}
        </div>
    );
}
