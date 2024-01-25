////////////////// Import dependencies //////////////////
import React from 'react';
import Colors from "../../utils/colors.utils";
import logo from "../../assets/logoBugblaster.png";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function NavBar({ actionText, action }) {
  return (
    <div style={styles.root}>
      <div style={styles.logoFrame}>
        <img 
          src={logo}
          alt="Logo"
          style={styles.logo}
        />
      </div>
      <div style={styles.navFrame}>
        <button onClick={action} style={styles.button}>{actionText}</button>
      </div>
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    display: 'flex',
    width: "100%",
    height: "5.625rem",
    alignItems: 'center',
    backgroundColor: Colors.five,
    borderBottom: `2px solid ${Colors.eight}`
  },

  logoFrame: {
    width: "70%",
    height: "100%",
    display: "flex",
    alignItems: "center"
  },

  logo: {
    width: "11.375rem",
    height: "auto",
    marginLeft: "20px"
  },

  navFrame: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },

  button: {
    width: "6.6rem",
    height: "2.5rem",
    marginRight: "20px",
    backgroundColor: Colors.four,
    borderWidth: "0",
    borderRadius: '5px',
    color: Colors.five,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.85rem',
  }
};
///////////////////////////////////////////