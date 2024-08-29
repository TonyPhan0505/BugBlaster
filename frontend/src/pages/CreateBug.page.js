////////////////// Import dependencies //////////////////
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavBar from '../components/shared/NavBar.component';

import IdGenerator from '../utils/IdGenerator.utils';
import Colors from "../utils/colors.utils";
import AddPeriod from '../utils/AddPeriod.utils';
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function CreateBugPage() {
  const currentProject = useSelector(state => state.project.currentProject);
  const hasCreated = useSelector(state => state.bug.hasCreated);

  const [ id, _ ] = useState(IdGenerator());
  const [ briefDescription, setBriefDescription ] = useState("");
  const [ detailedDescription, setDetailedDescription ] = useState("");
  const [ assignees, setAssignees ] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

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
      window.alert("Failed to create bug.")
    }
  }, [hasCreated]);

  function createBugHandler() {
    if (briefDescription.length > 5 && detailedDescription.length > 5 && assignees.length > 2) {
      dispatch({
        type: "bug/create",
        payload: {
          id: id,
          datetime: new Date().getTime(),
          briefDescription: AddPeriod(briefDescription),
          detailedDescription: AddPeriod(detailedDescription),
          assignees: AddPeriod(assignees),
          projectName: currentProject.uniqueName
        }
      });
    } else {
      window.alert("Inputs are too short.");
    }
  }

  function cancelHandler() {
    navigate("/home");
  }

  function navAction() {
    dispatch({
      type: "project/logout"
    });
    navigate("/");
  }

  return (
    <div style={styles.root}>
      <NavBar 
        actionText="Log out"
        action={navAction}
      />
      <div style={styles.main}>
        <p style={styles.id}>Bug Id: #{id}</p>
        <input 
          type="text"
          style={styles.singleLineInputField}
          placeholder="brief description"
          value={briefDescription}
          onChange={(e) => setBriefDescription(e.target.value)}
          maxLength={23}
        />
        <textarea
          value={detailedDescription}
          placeholder="Detailed description"
          onChange={(e) => setDetailedDescription(e.target.value)}
          rows={3}
          style={styles.multilineInputField}
        />
        <input 
          type="text"
          style={styles.singleLineInputField}
          placeholder="assignees"
          value={assignees}
          onChange={(e) => setAssignees(e.target.value)}
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
    flexDirection: "column"
  },

  main: {
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
    width: "320px",
    height: '30px',
    backgroundColor: Colors.seven,
    borderWidth: '0',
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: '12px',
    borderRadius: "5px",
    marginTop: "15px"
  },

  multilineInputField: {
    width: "320px",
    borderWidth: '0',
    backgroundColor: Colors.seven,
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: "12px",
    borderRadius: "5px",
    marginTop: "20px"
  },

  buttonsFrame: {
    width: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "45px"
  },

  createButton: {
    width: "7.5rem",
    height: "2.5rem",
    marginRight: "20px",
    backgroundColor: Colors.three,
    borderWidth: "0",
    borderRadius: '5px',
    color: Colors.five,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '1rem'
  },

  cancelButton: {
    width: "7.5rem",
    height: "2.5rem",
    marginRight: "20px",
    backgroundColor: Colors.five,
    border: `2px solid ${Colors.two}`,
    borderRadius: '5px',
    color: Colors.six,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '1rem'
  }
};
///////////////////////////////////////////