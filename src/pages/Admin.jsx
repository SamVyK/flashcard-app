import { useState, useEffect } from "react";
const API = "http://127.0.0.1:8000";

const styles = {
    container: {
        width: "100%",
        maxWidth: "90vw",
        margin: "auto",
        padding: "2em 1em",
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2em",
    },
    title: {
        fontSize: "1.8em",
        fontWeight: 600,
        color: "#363d55",
    },
    logoutBtn: {
        backgroundColor: "#ff5353",
        color: "#ffffff",
        padding: "0.6em 1.2em",
        borderRadius: "0.4em",
        border: "none",
        cursor: "pointer",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
    },
    section: {
        marginBottom: "2.5em",
    },
    sectionTitle: {
        fontSize: "1.3em",
        fontWeight: 600,
        color: "#f5a623",
        marginBottom: "1em",
        borderBottom: "2px solid #f5a623",
        paddingBottom: "0.3em",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#ffffff",
        borderRadius: "0.4em",
        overflow: "hidden",
        boxShadow: "0 0.4em 1.2em rgba(200, 100, 0, 0.1)",
    },
    th: {
        backgroundColor: "#f5a623",
        color: "#ffffff",
        padding: "0.8em 1em",
        textAlign: "left",
        fontWeight: 600,
    },
    td: {
        padding: "0.8em 1em",
        borderBottom: "1px solid #f0f0f0",
        color: "#414a67",
    },
    empty: {
        textAlign: "center",
        color: "#999",
        padding: "2em",
    },
    backBtn: {
        backgroundColor: "#f5a623",
        color: "#ffffff",
        padding: "0.6em 1.2em",
        borderRadius: "0.4em",
        border: "none",
        cursor: "pointer",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
    },
};

export default function Admin({ token, onLogout, onBack }) {
    const [users, setUsers] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, historyRes] = await Promise.all([
                    fetch(`${API}/admin/users`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${API}/admin/history`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                const usersData = await usersRes.json();
                const historyData = await historyRes.json();
                setUsers(usersData);
                setHistory(historyData);
            } catch (err) {
                console.error("Error fetching admin data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (loading) return <p style={{ textAlign: "center", marginTop: "4em", color: "#f5a623" }}>Loading...</p>;

    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <div style={{ display: "flex", gap: "1em" }}>
                    <button style={styles.backBtn} onClick={onBack}>
                        ← Back
                    </button>
                    <button style={styles.logoutBtn} onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>All Users ({users.length})</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Username</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Admin</th>
                            <th style={styles.th}>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan="5" style={styles.empty}>No users found</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td style={styles.td}>{user.id}</td>
                                    <td style={styles.td}>{user.username}</td>
                                    <td style={styles.td}>{user.email}</td>
                                    <td style={styles.td}>{user.is_admin ? "✅ Yes" : "❌ No"}</td>
                                    <td style={styles.td}>{new Date(user.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* History Table */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>View History ({history.length})</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Username</th>
                            <th style={styles.th}>Question Viewed</th>
                            <th style={styles.th}>Viewed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length === 0 ? (
                            <tr><td colSpan="3" style={styles.empty}>No history yet</td></tr>
                        ) : (
                            history.map((item, index) => (
                                <tr key={index}>
                                    <td style={styles.td}>{item.username}</td>
                                    <td style={styles.td}>{item.question}</td>
                                    <td style={styles.td}>{new Date(item.viewed_at).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
                                



                


                



