////////////////// Import dependencies //////////////////
import React, { useState, useEffect } from 'react';
import { LuPencilLine } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../utils/Colors.utils";
import AddPeriod from "../../utils/AddPeriod.utils";

import { showInstructionAlert, showErrorAlert } from "../../utils/Alerts.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function UpdateCard({ update }) {
  const formattedDatetime = new Date(update.datetime);

  const hasUpdated = useSelector(state => state.update.hasUpdated);

  const [ isEditted, setIsEdited ] = useState(false);
  const [ location, setLocation ] = useState(update.location);
  const [ details, setDetails ] = useState(update.details);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasUpdated === 1) {
      dispatch({
        type: "update/reset_update"
      });
      setIsEdited(false);
    } else if (hasUpdated === 0) {
      dispatch({
        type: "update/reset_update"
      });
      showErrorAlert("Failed to edit update.");
    }
  }, [hasUpdated]);

  function getTime() {
    const hours = formattedDatetime.getHours();
    const minutes = formattedDatetime.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  }

  function editHandler() {
    setIsEdited(true);
  }

  function cancel() {
    setIsEdited(false);
  }

  function editUpdate() {
    if (location.length > 3 && details.length > 3) {
      dispatch({
        type: "update/update",
        payload: {
          updateId: update.id,
          details: AddPeriod(details),
          location: location
        }
      });
    } else {
      showInstructionAlert("Inputs are too short.");
    }
  }

  function deleteUpdate() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this update?"
    );
    if (confirmed) {
      dispatch({
        type: "update/delete",
        payload: update.id
      });
      setIsEdited(false);
    }
  }

  return (
    <div style={ !isEditted ? styles.root : styles.editRoot }>
      <div style={styles.topBar}>
        <div style={styles.leftTopBar}>
          <p style={ !isEditted ? styles.datetime : styles.editDatetime }>{formattedDatetime.getDate()}/{formattedDatetime.getMonth() + 1}/{formattedDatetime.getFullYear()}, {getTime()}</p>
        </div>
        <div style={styles.rightTopBar}>
          {
            !isEditted ?
              <LuPencilLine onClick={editHandler} style={styles.editIcon}/>
            : null
          }
        </div>
      </div>
      {
        !isEditted ?
          <>
            <p style={styles.text}>Location of fix: {location}</p>
            <p style={styles.text}>Details: {AddPeriod(details)}</p>
          </>
        : 
          <>
            <input 
              type="text"
              style={styles.singleLineInputField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              style={styles.multilineInputField}
            />
            <div style={styles.buttonsFrame}>
              <button onClick={editUpdate} style={styles.editButton}>Edit</button>
              <button onClick={deleteUpdate} style={styles.deleteButton}>Delete</button>
              <button onClick={cancel} style={styles.cancelButton}>Cancel</button>
            </div>
          </>
      }
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    width: "90%",
    paddingTop: "16px",
    paddingBottom: "15px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.seven,
    marginTop: "20px",
    borderRadius: "10px"
  },

  editRoot: {
    width: "55%",
    paddingTop: "20px",
    paddingBottom: "15px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.seven,
    marginTop: "20px",
    borderRadius: "10px"
  },

  topBar: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  leftTopBar: {
    width: "80%"
  },

  rightTopBar: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-end"
  },

  datetime: {
    fontSize: "1rem",
    fontFamily: "Arial",
    marginTop: "0px",
    marginBottom: "0px",
    marginLeft: "20px",
    color: Colors.two
  },

  editDatetime: {
    fontSize: "1rem",
    fontFamily: "Arial",
    marginTop: "0px",
    marginBottom: "0px",
    marginLeft: "20px",
    color: Colors.six
  },

  editIcon: {
    fontSize: "1.025rem",
    marginRight: "20px",
    cursor: "pointer",
    color: Colors.four
  },

  text: {
    fontSize: "1rem",
    fontFamily: "Arial",
    marginLeft: "20px",
    marginTop: "10px",
    marginBottom: "0px",
    marginRight: "20px",
    wordWrap: "break-word"
  },

  singleLineInputField: {
    width: "88%",
    height: '30px',
    backgroundColor: Colors.five,
    borderWidth: '0',
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: '20px',
    borderRadius: "5px",
    marginTop: "15px",
    marginLeft: "20px"
  },

  multilineInputField: {
    width: "88%",
    borderWidth: '0',
    backgroundColor: Colors.five,
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: "20px",
    borderRadius: "5px",
    marginTop: "20px",
    marginLeft: "20px"
  },

  buttonsFrame: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "10px"
  },

  editButton: {
    width: "5.5rem",
    height: "2.3rem",
    marginRight: "20px",
    backgroundColor: Colors.three,
    borderWidth: "0",
    borderRadius: '5px',
    color: Colors.five,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.89rem',
    marginLeft: "20px"
  },

  deleteButton: {
    width: "5.5rem",
    height: "2.3rem",
    marginRight: "20px",
    backgroundColor: Colors.nine,
    borderWidth: "0",
    borderRadius: '5px',
    color: Colors.five,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.89rem'
  },

  cancelButton: {
    width: "5.5rem",
    height: "2.3rem",
    marginRight: "20px",
    backgroundColor: Colors.five,
    border: `2px solid ${Colors.two}`,
    borderRadius: '5px',
    color: Colors.two,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.89rem'
  }
};
///////////////////////////////////////////