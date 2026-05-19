import { useState } from "react";
const API = "http://127.0.0.1:8000";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8f0",
  },
  cards: {
    backgroundColor: "#ffffff",
    padding: "3em 2.5em",
    borderRadius: "0.8em",
    boxShadow: "0 1em 2em rgba(200, 100, 0, 0.15)",
    width: "90vw",
    maxWidth: "28em",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  title: {
    fontSize: "2em",
    fontWeight: 600,
    color: "#363d55",
    textAlign: "center",
    marginBottom: "0.5em",
  },
  input: {
    width: "100%",
    padding: "0.75em 1em",
    border: "1px solid #d0d0d0",
    borderRadius: "0.4em",
    fontSize: "1em",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    color: "#414a67",
  },
  btn: {
    backgroundColor: "#f5a623",
    color: "#ffffff",
    padding: "0.8em",
    borderRadius: "0.4em",
    fontSize: "1em",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    fontFamily: "Poppins, sans-serif",
    marginTop: "0.5em",
  },
  error: {
    color: "#ff5353",
    fontSize: "0.9em",
    textAlign: "center",
  },
  success: {
    color: "#28a745",
    fontSize: "0.9em",
    textAlign: "center",
  },
  link: {
    textAlign: "center",
    fontSize: "0.9em",
    color: "#414a67",
  },
  linkBtn: {
    color: "#f5a623",
    cursor: "pointer",
    fontWeight: 600,
    background: "none",
    border: "none",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9em",
  },
};

export default function Register({ onGoLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.detail || "Registration failed");
                return;
            }
            setSuccess("Account created! Redirecting to login...");
            setTimeout(() => onGoLogin(), 1500);
        } catch (err) {
            setError("Could not connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.cards}>
                <h1 style={styles.title}>🪪 Create Account</h1>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
                <input
                    style={styles.input}
                    type = "text"
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />
                <input
                    style={styles.input}
                    type = "email"
                    placeholder = "Email"
                    value = {email} 
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <input
                    style={styles.input}
                    type = "password"
                    placeholder = "Password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
                <button style={styles.btn} onClick={handleRegister} disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>
                <p style={styles.link}>
                    Already have an account?{" "}
                    <button style={styles.linkBtn} onClick={onGoLogin}>
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
}

