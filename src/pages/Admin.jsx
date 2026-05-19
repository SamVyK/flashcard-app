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


