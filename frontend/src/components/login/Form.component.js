///////////////////////// Import Dependencies /////////////////////////
import React from "react";


///////////////////////// Helper /////////////////////////
///////////////////////// Component /////////////////////////
export default function Login() {
    return (
        <div style={styles.container}>
            <label style={styles.label}>Email:</label>
            <input type="text" style={styles.input} placeholder="Enter your email:" />

            <label style={styles.label}>Password:</label>
            <input type="password" style={styles.input} placeholder="Enter your password" />

            <button style={styles.button}>Login</button>
        </div>
    );
}
///////////////////////// Styles /////////////////////////
const styles = {
    root:{
        backgroundColor: '#9EC8B9',
    },
    container: {
        maxWidth: '300px', 
        margin: 'auto', 
        paddingTop: '20px', 
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};