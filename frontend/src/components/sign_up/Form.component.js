////////////////// Import dependencies //////////////////
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Colors from "../../utils/colors.utils";
import { showInstructionAlert } from "../../utils/Alerts.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function Form() {
  const isSignedUp = useSelector(state => state.project.isSignedUp);
  
  const [ projectName, setProjectName ] = useState("");
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
            type: "project/reset_sign_up"
        });
        navigate("/home");
    } else if (isSignedUp === 0) {
        dispatch({
          type: "project/reset_sign_up"
        });
        window.alert("Failed to sign up.")
    } else if (isSignedUp === 3) {
      dispatch({
        type: "project/reset_sign_up"
      });
      showInstructionAlert("This project name was already taken.");
    }
  }, [isSignedUp]);

  function signUp() {
    if (isValidProjectName()) {
      dispatch({
        type: "project/sign_up",
        payload: {
          projectName: projectName,
          emailAddress: emailAddress,
          password: password
        }
      });
    } else {
      showInstructionAlert("Project name must be at least 5-character long without any whitespace.");
    }
  }

  function isValidProjectName() {
    return projectName.length >= 5 && !projectName.includes(" ");
  }

  return (
    <div style={isMobile ? styles.rootMobile : styles.root}>
      <label style={styles.label}>{"Unique project name (no whitespace):"}</label>
      <input 
          type="text" 
          style={styles.input} 
          placeholder="Enter your unique project name:" 
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
      />

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