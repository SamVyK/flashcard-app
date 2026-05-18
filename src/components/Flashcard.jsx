import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const styles = {
    card: {
        backgroundColor: "#ffffff",
        boxShadow: "0 0.4em 1.2em rgba(200, 100, 0, 0.1)",
        padding: "1.2em",
        borderRadius: "0.4em",
    },
    questionDiv: {
        textAlign: "justify",
        marginBottom: "0.5em",
        fontWeight: "500",
        color: "#363d55",
    },
    answerDiv: {
        textAlign: "justify",
        marginTop: "1em",
        fontWeight: "400",
        color: "#414a67",
    },
    showHideBtn: {
        display: "block",
        backgroundColor: "#f5a623",
        color: "#ffffff",
        textAlign: "center",
        padding: "0.6em 0",
        borderRadius: "0.3em",
        width: "100%",
        cursor: "pointer",
        border: "none",
        fontFamily: "Poppins, sans-serif",
        fontSize: "1em",
    },
    buttonsCon: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "0.5em",
    },
    editBtn: {
        backgroundColor: "transparent",
        padding: "0.5em",
        fontSize: "1.2em",
        color: "#f5a623",
        border: "none",
        cursor: "pointer",
    },
    deleteBtn: {
        background: "transparent",
        padding: "0.5em",
        fontSize: "1.2em",
        color: "#ff5353",
        border: "none",
        cursor: "pointer",
    },
};