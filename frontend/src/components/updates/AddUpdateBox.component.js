////////////////// Import dependencies //////////////////
import React from 'react';
import Colors from "../../utils/colors.utils";
import { useSelector, useDispatch } from "react-redux";
import IdGenerator from "../../utils/IdGenerator.utils";
import AddPeriod from '../../utils/AddPeriod.utils';
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function AddUpdateBox({ bugId, setAddUpdateBoxOpened, fixLocation, setFixLocation, fixDetails, setFixDetails }) {
  const dispatch = useDispatch();
  const currentTeam = useSelector(state => state.team.currentTeam);

  function createFix() {
    if (fixLocation.length > 3 && fixDetails.length > 3) {
      dispatch({
        type: "update/create",
        payload: {
          id: IdGenerator(),
          datetime: new Date().getTime(),
          details: AddPeriod(fixDetails),
          location: AddPeriod(fixLocation),
          bugId: bugId,
          teamId: currentTeam.id
        }
      });
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
    backgroundColor: Colors.eight,
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    paddingBottom: "10px"
  },

  singleLineInputField: {
    width: "89%",
    height: '20px',
    backgroundColor: Colors.seven,
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
    backgroundColor: Colors.seven,
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
    color: Colors.six,
    fontFamily: "Arial",
    cursor: 'pointer',
    fontSize: '0.89rem'
}
};
///////////////////////////////////////////