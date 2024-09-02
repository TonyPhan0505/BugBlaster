////////////////// Import dependencies //////////////////
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

import SmallLoader from "../shared/SmallLoader.component";

import Colors from "../../utils/Colors.utils";
import { showInstructionAlert, showErrorAlert } from "../../utils/Alerts.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function Form() {
  const isSignedUp = useSelector(state => state.project.isSignedUp);
  
  const [ projectName, setProjectName ] = useState("");
  const [ emailAddress, setEmailAddress ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordHidden, setPasswordHidden ] = useState(true);
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);
  const [ signingUp, setSigningUp ] = useState(false);

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
    if (signingUp) {
      signUp();
    }
  }, [signingUp]);

  useEffect(() => {
    if (isSignedUp === 1) {
      dispatch({
          type: "project/reset_sign_up"
      });
      setSigningUp(false);
      navigate("/home");
    } else if (isSignedUp === 0) {
      dispatch({
        type: "project/reset_sign_up"
      });
      setSigningUp(false);
      showErrorAlert("Failed to sign up.");
    } else if (isSignedUp === 3) {
      dispatch({
        type: "project/reset_sign_up"
      });
      setSigningUp(false);
      showInstructionAlert("This project name was already taken.");
    } else if (isSignedUp === 4) {
      dispatch({
        type: "project/reset_sign_up"
      });
      setSigningUp(false);
      showInstructionAlert("This email address is not yet registered. Please contact the development team.");
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
      <div style={styles.passwordInputWrapper}>
        <input 
            type={passwordHidden ? "password" : "text"}
            style={styles.passwordInput} 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <div 
          style={styles.hideButton}
          onClick={() => setPasswordHidden(!passwordHidden)}
        >
          {passwordHidden ? (<IoEye 
            size={window.innerWidth * 0.017}
          />) : (<IoEyeOff 
            size={window.innerWidth * 0.017}
          />)}
        </div>
      </div>

      <button 
        onClick={() => setSigningUp(true)} 
        style={styles.button}
      >{signingUp ? (<SmallLoader 
        loading={signingUp}
      />) : "Sign up"}</button>
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
  passwordInputWrapper: {
    width: "100%",
    height: "1.7rem",
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: '10px'
  },
  passwordInput: {
    width: '90%',
    height: "100%",
    padding: '8px',
    borderRadius: "0.3rem",
    borderWidth: "0",
    fontSize: "1rem",
    backgroundColor: Colors.seven
  },
  hideButton: {
    width: "10%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
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