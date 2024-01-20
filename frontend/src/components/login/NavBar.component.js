import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './assets/logoBugblaster.png';

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
                    <NavLink to="/">Sign up</NavLink>
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
        maxWidth: '100px',
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
};