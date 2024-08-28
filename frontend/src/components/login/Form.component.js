////////////////// Import dependencies //////////////////
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Colors from "../../utils/colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function Form() {
    const isLoggedIn = useSelector(state => state.team.isLoggedIn);

    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);

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
        if (isLoggedIn === 1) {
            dispatch({
                type: "team/reset_login"
            });
            navigate("/home");
        } else if (isLoggedIn === 0) {
            dispatch({
                type: "team/reset_login"
            });
            window.alert("Wrong credentials.")
        }
    }, [isLoggedIn]);
    
    function login() {
        dispatch({
            type: "team/login",
            payload: {
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

            <button onClick={login} style={styles.button}>Login</button>
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