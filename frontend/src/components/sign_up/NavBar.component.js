////////////////// Import dependencies //////////////////
import React from 'react';
import logo from '../../assets/logoBugblaster.png';
import Colors from "../../utils/colors.utils";
import { useNavigate } from "react-router-dom";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function NavBar() {
    const navigate = useNavigate();

    function navToLogin() {
        navigate("/")
    }

    return (
        <nav style={styles.nav}>
            <div style={styles.logoContainer}>
                <img style={styles.logo} src={logo} alt="Logo" />
            </div>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <button onClick={navToLogin} style={styles.button}>
                        Login
                    </button>
                </li>
            </ul>
        </nav>
    );
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px', 
    backgroundColor: Colors.five, 
  },

  logoContainer: {
    width: "70%",
    height: "100%",
    display: "flex",
    alignItems: "center"
  },

  logo: {
    width: "9.375rem",
    height: "auto",
    marginLeft: "20px"
  },

  navList: {
    width: "30%",
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: "flex-end"
  },
  navItem: {
    marginLeft: '10px', 
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
  },
};
///////////////////////////////////////////