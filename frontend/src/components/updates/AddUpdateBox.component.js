////////////////// Import dependencies //////////////////
import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../utils/colors.utils";
import IdGenerator from "../../utils/IdGenerator.utils";
import AddPeriod from '../../utils/AddPeriod.utils';
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function AddUpdateBox({ 
  bugId, 
  setAddUpdateBoxOpened, 
  fixLocation, 
  setFixLocation, 
  fixDetails, 
  setFixDetails 
}) {
  const currentProject = useSelector(state => state.project.currentProject);

  const dispatch = useDispatch();

  function createFix() {
    if (fixLocation.length > 3 && fixDetails.length > 3) {
      dispatch({
        type: "update/create",
        payload: {
          id: IdGenerator(),
          datetime: new Date().getTime(),
          details: AddPeriod(fixDetails),
          location: fixLocation,
          bugId: bugId,
          projectName: currentProject.uniqueName
        }
      });
      setAddUpdateBoxOpened(false);
      setFixLocation("");
      setFixDetails("");
    } else {
      window.alert("Inputs are too short.");
    }
  }

  function cancel() {
    setAddUpdateBoxOpened(false);
  }

  return (
    <div style={styles.root}>
      <input 
        type="text"
        style={styles.singleLineInputField}
        placeholder="location of fix"
        value={fixLocation}
        onChange={(e) => setFixLocation(e.target.value)}
      />
      <textarea
        value={fixDetails}
        onChange={(e) => setFixDetails(e.target.value)}
        placeholder="description"
        rows={2}
        style={styles.multilineInputField}
      />
      <div style={styles.buttonsFrame}>
        <button onClick={createFix} style={styles.createButton}>Create</button>
        <button onClick={cancel} style={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "10px",
    backgroundColor: Colors.seven,
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    paddingBottom: "10px"
  },

  singleLineInputField: {
    width: "89%",
    height: '20px',
    backgroundColor: Colors.five,
    borderWidth: '0',
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: '12px',
    borderRadius: "5px",
    marginTop: "15px"
  },

  multilineInputField: {
    width: "89%",
    borderWidth: '0',
    backgroundColor: Colors.five,
    fontSize: '1.055rem',
    fontFamily: "Arial",
    padding: "12px",
    borderRadius: "5px",
    marginTop: "20px"
  },

  buttonsFrame: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "10px"
  },

  createButton: {
    width: "5.5rem",
    height: "2.3rem",
    marginRight: "20px",
    backgroundColor: Colors.three,
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