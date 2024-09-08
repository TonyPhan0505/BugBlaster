////////////////// Import dependencies //////////////////
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavBar from '../components/shared/NavBar.component';

import IdGenerator from '../utils/IdGenerator.utils';
import Colors from "../utils/Colors.utils";
import AddPeriod from '../utils/AddPeriod.utils';
import { showInstructionAlert, showErrorAlert } from "../utils/Alerts.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function CreateBugPage() {
  const accessToken = localStorage.getItem("accessToken");

  const isLoggedIn = useSelector(state => state.project.isLoggedIn);
  const currentProject = useSelector(state => state.project.currentProject);
  const hasVerifiedAccessToken = useSelector(state => state.project.hasVerifiedAccessToken);
  const validAccessToken = useSelector(state => state.project.validAccessToken);
  const hasCreated = useSelector(state => state.bug.hasCreated);

  const [ id, _ ] = useState(IdGenerator());
  const [ title, setTitle ] = useState("");
  const [ detailedDescription, setDetailedDescription ] = useState("");
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
    if (!accessToken || isLoggedIn !== 1) {
      logOut();
    } else {
      dispatch({
        type: "project/verify_access_token",
        payload: accessToken
      });
    }
  }, []);

  useEffect(() => {
    if (hasVerifiedAccessToken === 1) {
      dispatch({
        type: "project/reset_verify_access_token"
      });
      if (!validAccessToken) {
        logOut();
      }
    } else if (hasVerifiedAccessToken === 0) {
      dispatch({
        type: "project/reset_verify_access_token"
      });
      showErrorAlert("ERROR: Failed to verify access token.");
    }
  }, [hasVerifiedAccessToken]);

  useEffect(() => {
    if (hasCreated === 1) {
      dispatch({
        type: "bug/reset_create"
      });
      navigate("/home")
    } else if (hasCreated === 0) {
      dispatch({
        type: "bug/reset_create"
      });
      showErrorAlert("Failed to create bug.")
    }
  }, [hasCreated]);

  function createBugHandler() {
    if (title.length >= 5 && detailedDescription.length >= 5) {
      if (title.length <= 40) {
        dispatch({
          type: "bug/create",
          payload: {
            id: id,
            datetime: new Date().getTime(),
            title: AddPeriod(title),
            detailedDescription: AddPeriod(detailedDescription),
            projectName: currentProject.uniqueName
          }
        });
      } else {
        showInstructionAlert("Title must be no longer than 40 characters.");
      }
    } else {
      showInstructionAlert("Title and description must be at least 5 characters long.");
    }
  }

  function cancelHandler() {
    navigate("/home");
  }

  function logOut() {
    dispatch({
      type: "project/logout"
    });
    navigate("/");
  }

  return (
    <div style={styles.root}>
      <NavBar 
        actionText="Log out"
        action={logOut}
      />
      <div style={isMobile ? styles.mobileMain : styles.main}>
        <p style={styles.id}>Issue ID: #{id}</p>
        <input 
          type="text"
          style={styles.singleLineInputField}
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={40}
        />
        <textarea
          value={detailedDescription}
          placeholder="detailed description"
          onChange={(e) => setDetailedDescription(e.target.value)}
          rows={3}
          style={styles.multilineInputField}
        />
        <div style={styles.buttonsFrame}>
          <button onClick={createBugHandler} style={styles.createButton}>Create</button>
          <button onClick={cancelHandler} style={styles.cancelButton}>Cancel</button>
        </div>
      </div> 
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  main: {
    marginTop: "30px",
    width: "35%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  mobileMain: {
    marginTop: "30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  id: {
    fontSize: "1.525rem",
    fontFamily: "Arial",
    color: Colors.four
  },

  singleLineInputField: {
    width: "80%",
    height: '1.875rem',
    backgroundColor: Colors.seven,
    borderWidth: '0',
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: '12px',
    borderRadius: "5px",
    marginTop: "15px"
  },

  multilineInputField: {
    width: "80%",
    borderWidth: '0',
    backgroundColor: Colors.seven,
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: "12px",
    borderRadius: "5px",
    marginTop: "20px"
  },

  buttonsFrame: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "45px"
  },

  createButton: {
    width: "45%",
    height: `${window.innerHeight * 0.055}px`,
    marginRight: "20px",
    backgroundColor: Colors.three,
    borderWidth: "0",
    borderRadius: '5px',
    color: Colors.five,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.9rem'
  },

  cancelButton: {
    width: "45%",
    height: `${window.innerHeight * 0.055}px`,
    marginRight: "20px",
    backgroundColor: Colors.five,
    border: `2px solid ${Colors.two}`,
    borderRadius: '5px',
    color: Colors.six,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
};
///////////////////////////////////////////