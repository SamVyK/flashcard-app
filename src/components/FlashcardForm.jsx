import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import { text } from '@fortawesome/fontawesome-svg-core';

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
    },
    modal: {
        backgroundColor: "#ffffff",
        width: "90vw",
        maxWidth: "34em",
        padding: "3em 2em",
        borderRadius: "0.6em",
        boxShadow: "0 1em 2em rgba(200, 100, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
    },
    title: {
        fontSize: "2.2em",
        color: "#363d55",
        fontwieght: 600,
        textAlign: "center",
        marginBottom: "1.5em",
    },
    topRow: {
        display: "grid",
        gridTemplateColumns: "11fr 1fr",
        gap: "1em",
        marginBottom: "1em",
        alignItems: "center",
    },
    error: {
        color: "#ff5353",
        fontwieght: 400,
    },
    closeBtn: {
        fontSize: "1.4em",
        backgroundColor: "#f5a623",
        height: "1.8em",
        width: "1.8em",
        display: "grid",
        placeItems: "center",
        color: "#ffffff",
        borderRadius: "50%",
        cursor: "pointer",
        justifySelf: "flex-end",
        border: "none",
    },
    saveBtn: {
        fontSize: "1em",
        backgroundColor: "#f5a623",
        color: "#ffffff",
        padding: "0.6em 0",
        borderRadius: "0.3em",
        fontwieght: 600,
        marginTop: "1em",
        cursor: "pointer",
        fontFamily: "Poppins, sans-serif",
    },
};

export default function FlashcardForm({ onSave, onClose, editCard }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (editCard) {
            setQuestion(editCard.question);
            setAnswer(editCard.answer);
        } else {
            setQuestion("");
            setAnswer("");
        }
    }, [editCard]);

    const handleSave = () => {
        if (!question.trim() === "" || !answer.trim() === "") {
            setError(true);
            return;
        }
        onSave({ question: question.trim(), answer: answer.trim() });
        setQuestion("");
        setAnswer("");
        setError(false);
    };
    
    return createPortal(
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>
                    {editCard ? "Edit Flashcard" : "Add Flashcard"}
                </h2>
                <div style={styles.topRow}>
                    <div>
                        {error && (
                            <span style={styles.error}>
                                Both fields are required!
                            </span>
                        )}
                    </div>
                    <button style={styles.closeBtn} onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <label>Question:</label>
                <textarea
                    rows={2}
                    placeholder="Enter the question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <label>Answer:</label>
                <textarea
                    rows={4}
                    placeholder="Enter the answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button style={styles.saveBtn} onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>,
        document.body
    );
}   