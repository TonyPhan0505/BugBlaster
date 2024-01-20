////////////////// Import dependencies //////////////////
import React from 'react';
import Colors from "../../utils/colors.utils";
import logo from "../../assets/logoBugblaster.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOut() {
    dispatch({
      type: "team/logout"
    });
    localStorage.removeItem("accessToken");
    navigate("/");
  }

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
        <button onClick={signOut} style={styles.logOutButton}>Sign out</button>
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
    height: "3.625rem",
    alignItems: 'center',
    backgroundColor: Colors.five
  },

  logoFrame: {
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

  navFrame: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },

  logOutButton: {
    width: "7.5rem",
    height: "2.5rem",
    marginRight: "20px",
    backgroundColor: Colors.two,
    borderWidth: "0",
    borderRadius: '5px',
    color: Colors.five,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '1rem',
  }
};
///////////////////////////////////////////