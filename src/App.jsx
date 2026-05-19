import { useState, useEffect } from "react";
import Flashcard from "./components/Flashcard";
import FlashcardForm from "./components/FlashcardForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
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
    flexWrap: "wrap",
    gap: "1em",
  },
  title: {
    fontSize: "1.8em",
    fontWeight: 600,
    color: "#363d55",
  },
  rightBar: {
    display: "flex",
    gap: "0.8em",
    alignItems: "center",
    flexWrap: "wrap",
  },
  welcomeText: {
    color: "#414a67",
    fontSize: "0.95em",
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
  adminBtn: {
    fontSize: "1em",
    backgroundColor: "#363d55",
    color: "#ffffff",
    padding: "0.8em 1.2em",
    fontWeight: 500,
    borderRadius: "0.4em",
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
  },
  logoutBtn: {
    fontSize: "1em",
    backgroundColor: "#ff5353",
    color: "#ffffff",
    padding: "0.8em 1.2em",
    fontWeight: 500,
    borderRadius: "0.4em",
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
  },
  searchBar: {
    width: "100%",
    padding: "0.75em 1em",
    border: "1px solid #d0d0d0",
    borderRadius: "0.4em",
    fontSize: "1em",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    color: "#414a67",
    marginBottom: "1.5em",
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
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Load all flashcards from backend on startup
  useEffect(() => {
    if (!token)  return;
    const fetchCards = async () => {
      setLoading(true);
      try {
       const res = await fetch(
        `${API}/flashcards?search=${encodeURIComponent(search)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    } finally {
      setLoading(false);
    }
  };
  const debounce = setTimeout(fetchCards, 300);
  return () => clearTimeout(debounce);
}, [token, search]);

const handleLogin = (data) => {
  setToken(data.access_token);
  setUser(data);
  setPage("home");
};

const handleLogout = () => {
  setToken(null);
  setUser(null);
  setCards([]);
  setSearch("");
  setPage("login");
};

const handleSave = async ({ question, answer }) => {
  if (editCard) {
    const res = await fetch(`${API}/flashcards/${editCard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question, answer }),
    });
    const updated = await res.json();
    setCards(cards.map((c) => (c.id === editCard.id ? updated : c)));
    setEditCard(null);
  } else {
    const res = await fetch(`${API}/flashcards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
  await fetch(`${API}/flashcards/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  setCards(cards.filter((c) => c.id !== id));
};

const handleView = async (id) => {
  await fetch(`${API}/flashcards/${id}/views`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
};

//pages handling
if (page === "login")
    return <Login onLogin={handleLogin} onGoRegister={() => setPage("register")} />;
  if (page === "register")
    return <Register onGoLogin={() => setPage("login")} />;
  if (page === "admin")
    return (
      <Admin
        token={token}
        onLogout={handleLogout}
        onBack={() => setPage("home")}
      />
    );

//Home page
return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1 style={styles.title}>📇 Flashcard App</h1>
        <div style={styles.rightBar}>
          <span style={styles.welcomeText}>👤 {user?.username}</span>
          {user?.is_admin && (
            <button style={styles.adminBtn} onClick={() => setPage("admin")}>
              Admin
            </button>
          )}
          <button
            style={styles.addBtn}
            onClick={() => {
              setEditCard(null);
              setShowForm(true);
            }}
          >
            + Add Flashcard
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* Live Search */}
      <input
        style={styles.searchBar}
        type="text"
        placeholder="🔍 Search flashcards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p style={styles.loading}>Loading flashcards...</p>
      ) : cards.length === 0 ? (
        <p style={styles.empty}>
          {search
            ? `No flashcards found for "${search}"`
            : "No flashcards yet. Click '+ Add Flashcard' to get started!"}
        </p>
      ) : (
        <div style={styles.grid}>
          {cards.map((card) => (
            <Flashcard
              key={card.id}
              card={card}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
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










