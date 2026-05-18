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
