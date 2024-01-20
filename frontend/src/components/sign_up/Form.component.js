////////////////// Import dependencies //////////////////
import React from 'react';
import Colors from "../../utils/colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function Form() {
  return (
    <div style={styles.container}>
        <label style={styles.label}>Email:</label>
        <input type="text" style={styles.input} placeholder="Enter your email:" />

        <label style={styles.label}>Password:</label>
        <input type="password" style={styles.input} placeholder="Enter your password" />

        <button style={styles.button}>Sign up</button>
    </div>
);
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root:{
      backgroundColor: '#9EC8B9',
  },
  container: {
      maxWidth: '300px', 
      margin: 'auto', 
      paddingTop: '20px', 
      fontSize: "1.125rem",
      marginTop: "30px"
  },
  label: {
      display: 'block',
      marginBottom: '5px',
      fontFamily: "Arial",
      marginTop: "20px",
  },
  input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      borderWidth: "0",
      marginTop: "20px",
      fontSize: "1rem",
      backgroundColor: Colors.seven
  },
  button: {
    width: "4.5rem",
    height: "2rem",
    marginRight: "20px",
    backgroundColor: Colors.two,
    borderWidth: "0",
    borderRadius: '5px',
    color: Colors.five,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.85rem',
    marginTop: "20px"
  },
};
///////////////////////////////////////////