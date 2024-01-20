///////////////////////// Import Dependencies /////////////////////////
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logoBugblaster.png'

///////////////////////// Component /////////////////////////
export default function NavBarSection() {
    return (
        // HTML Layout
        <nav style={styles.nav}>
            <div style={styles.logoContainer}>
                <img src={logo} alt="Logo" />
            </div>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <button style={styles.button}>
                        <NavLink to="/">Sign up</NavLink>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

///////////////////////// Styles /////////////////////////
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px', 
        backgroundColor: '#f0f0f0', 
    },
    logoContainer: {
        maxWidth: '20px',
        height: 'auto',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
    },
    navItem: {
        marginLeft: '10px', 
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
};



