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


    