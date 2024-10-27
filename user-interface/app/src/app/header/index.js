import React from "react";

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: '20px',
        color: 'white',
    },
    title: {
        margin: 0,
    },
    nav_list: {
        listStyle: "none",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
    },
    nav_item: {
        margin: "0 15px",
        color: "white",
        textDecoration: "none",
    },
};

const Header = () => (
    <header className="app-root-header" style={styles.header}>
        <h1 style={styles.title}>Test / User interface</h1>
        <nav>
            <ul style={styles.nav_list}>
                <li><a href="#home" style={styles.nav_item}>Accueil</a></li>
                <li><a href="#about" style={styles.nav_item}>À Propos</a></li>
                <li><a href="#contact" style={styles.nav_item}>Contact</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;