////////////////// Import dependencies //////////////////
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

import SmallLoader from "../shared/SmallLoader.component";

import Colors from "../../utils/Colors.utils";
import { showSuccessAlert, showInstructionAlert } from "../../utils/Alerts.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function Form() {
    const isLoggedIn = useSelector(state => state.project.isLoggedIn);

    const [ projectName, setProjectName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordHidden, setPasswordHidden ] = useState(true);
    const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);
    const [ loggingIn, setLoggingIn ] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        if (loggingIn) {
            login();
        }
    }, [loggingIn]);

    useEffect(() => {
        if (isLoggedIn === 1) {
            setLoggingIn(false);
            showSuccessAlert("Successfully logged in.");
            navigate("/home");
        } else if (isLoggedIn === 0) {
            dispatch({
                type: "project/reset_login"
            });
            setLoggingIn(false);
            showInstructionAlert("Incorrect credentials.")
        }
    }, [isLoggedIn]);
    
    function login() {
        dispatch({
            type: "project/login",
            payload: {
                projectName: projectName, 
                password: password
            }
        });
    }

    function showForgotPasswordInstruction() {
        showInstructionAlert("Please contact the development team using your project's registered email address.");
    }

    return (
        <div style={isMobile ? styles.rootMobile : styles.root}>
            <label style={styles.label}>Project name:</label>
            <input 
                type="text" 
                style={styles.input} 
                placeholder="Enter your project name" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
                        style={isMobile ? styles.mobileEye : styles.eye}
                    />) : (<IoEyeOff 
                        style={isMobile ? styles.mobileEye : styles.eye}
                    />)}
                </div>
            </div>

            <p 
                style={styles.forgotPassword}
                onClick={showForgotPasswordInstruction}
            >Forgot password?</p>

            <button 
                onClick={() => setLoggingIn(true)} 
                style={styles.button}
            >{loggingIn ? (<SmallLoader />) 
            : "Login"}</button>
        </div>
    );
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    width: "25%", 
    margin: 'auto', 
    display: "flex",
    flexDirection: "column",
    paddingTop: '20px', 
    fontSize: "1.125rem",
    marginTop: "100px"
  },
  rootMobile: {
    width: "88%", 
    display: "flex",
    flexDirection: "column",
    paddingTop: '20px', 
    fontSize: "1.125rem"
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontFamily: "Arial",
    marginTop: "20px",
    marginLeft: "20px"
  },
  input: {
    width: '95%',
    height: "1.7rem",
    padding: '8px',
    marginBottom: '10px',
    borderRadius: "0.3rem",
    borderWidth: "0",
    marginTop: "20px",
    marginLeft: "20px",
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
    width: '85%',
    height: "100%",
    padding: '8px',
    borderRadius: "0.3rem",
    borderWidth: "0",
    fontSize: "1rem",
    backgroundColor: Colors.seven,
    marginLeft: "20px"
  },
  hideButton: {
    width: "15%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  eye: {
    fontSize: window.innerWidth * 0.014
  },
  mobileEye: {
    fontSize: window.innerWidth * 0.07
  },
  forgotPassword: {
    textDecoration: 'underline',
    fontFamily: "Arial",
    fontSize: "0.92rem",
    marginTop: "30px",
    marginBottom: "15px",
    cursor: "pointer",
    marginLeft: "20px"
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
    marginTop: "20px",
    marginLeft: "20px"
  },
};
///////////////////////////////////////////