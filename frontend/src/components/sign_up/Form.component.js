////////////////// Import dependencies //////////////////
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Colors from "../../utils/colors.utils";
import IdGenerator from "../../utils/IdGenerator.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function Form() {
  const isSignedUp = useSelector(state => state.team.isSignedUp);
  
  const [ emailAddress, setEmailAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSignedUp === 1) {
        dispatch({
            type: "team/reset_sign_up"
        });
        navigate("/home");
    } else if (isSignedUp === 0) {
        dispatch({
          type: "team/reset_sign_up"
        });
        window.alert("Failed to sign up.")
    }
  }, [isSignedUp]);

  function signUp() {
    dispatch({
      type: "team/sign_up",
      payload: {
        teamId: IdGenerator(),
        emailAddress: emailAddress,
        password: password
      }
    });
  }

  return (
    <div style={isMobile ? styles.rootMobile : styles.root}>
      <label style={styles.label}>Email:</label>
      <input 
          type="text" 
          style={styles.input} 
          placeholder="Enter your email:" 
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
      />

      <label style={styles.label}>Password:</label>
      <input 
          type="password" 
          style={styles.input} 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signUp} style={styles.button}>Sign up</button>
  </div>
);
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    width: '25%', 
    margin: 'auto', 
    paddingTop: '20px', 
    fontSize: "1.125rem",
    marginTop: "100px"
  },
  rootMobile: {
    width: "84%", 
    margin: 'auto', 
    paddingTop: '20px', 
    fontSize: "1.125rem",
    marginTop: "100px"
  },
  label: {
      display: 'block',
      marginBottom: '5px',
      fontFamily: "Arial",
      marginTop: "20px",
  },
  input: {
    width: '100%',
    height: "1.7rem",
    padding: '8px',
    marginBottom: '10px',
    borderRadius: "0.3rem",
    borderWidth: "0",
    marginTop: "20px",
    fontSize: "1rem",
    backgroundColor: Colors.seven
  },
  button: {
    width: "4.8rem",
    height: "2.1rem",
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