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
    card: {
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

export default function Login({ onLogin, onGoRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const res = await fetch(`${API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.detail || "Login failed.");
                return;
            }
            onLogin(data);
        } catch (err) {
            setError("Could not connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>📇 Flashcard App</h1>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button style={styles.btn} onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p style={styles.link}>
                    Don't have an account?{" "}
                    <button style={styles.linkBtn} onClick={onGoRegister}>
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
}
            


