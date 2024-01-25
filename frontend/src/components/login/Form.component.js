////////////////// Import dependencies //////////////////
import React, { useEffect, useState } from 'react';
import Colors from "../../utils/colors.utils";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function Form() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.team.isLoggedIn);
    const navigate = useNavigate();
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        localStorage.removeItem("accessToken");
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
        <div style={styles.root}>
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
      width: '300px', 
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