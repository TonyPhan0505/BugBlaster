///////////////////////// Import Dependencies /////////////////////////
import React from "react";


///////////////////////// Helper /////////////////////////



///////////////////////// Component /////////////////////////
export default function Login() {
    return (
        <div style={loginStyles.container}>
            <label style={loginStyles.label}>Username/Email:</label>
            <input type="text" style={loginStyles.input} placeholder="Enter your username or email" />

            <label style={loginStyles.label}>Password:</label>
            <input type="password" style={loginStyles.input} placeholder="Enter your password" />

            <button style={loginStyles.button}>Login</button>
        </div>
    );
}



///////////////////////// Styles /////////////////////////
const loginStyles = {
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