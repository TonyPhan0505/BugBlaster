////////////////// Import dependencies //////////////////
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

import SmallLoader from "../shared/SmallLoader.component";

import Colors from "../../utils/Colors.utils";
import { showInstructionAlert } from "../../utils/Alerts.utils";
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
            dispatch({
                type: "project/reset_login"
            });
            setLoggingIn(false);
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

    return (
        <div style={isMobile ? styles.rootMobile : styles.root}>
            <label style={styles.label}>Email:</label>
            <input 
                type="text" 
                style={styles.input} 
                placeholder="Enter your project name:" 
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
                        size={window.innerWidth * 0.017}
                    />) : (<IoEyeOff 
                        size={window.innerWidth * 0.017}
                    />)}
                </div>
            </div>

            <button 
                onClick={() => setLoggingIn(true)} 
                style={styles.button}
            >{loggingIn ? (<SmallLoader 
                loading={loggingIn}
            />) : "Login"}</button>
        </div>
    );
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
      width: "25%", 
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
      marginTop: "20px"
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