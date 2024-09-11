////////////////// Import dependencies //////////////////
import React, { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataRow from '../shared/DataRow.component';

import Colors from "../../utils/Colors.utils";
import { showErrorAlert } from "../../utils/Alerts.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function BugCard({ bug }) {
  const datetime = new Date(bug.datetime);
  
  const hasDeleted = useSelector(state => state.bug.hasDeleted);
  const currentProject = useSelector(state => state.project.currentProject);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasDeleted === 1) {
      dispatch({
        type: "bug/reset_delete"
      });
      dispatch({
        type: "bug/fetch_bulk",
        payload: currentProject.uniqueName
      });
    } else if (hasDeleted === 0) {
      dispatch({
        type: "bug/reset_delete"
      });
      showErrorAlert("Failed to delete bug.");
    }
  }, [hasDeleted]);

  function formattedData(data) {
    let formatted = data;
    if (formatted[formatted.length - 1] !== ".") {
      formatted = formatted + ".";
    }
    if (formatted.length > 23) {
      return formatted.substring(0, 23) + "...";
    }
    return formatted;
  }

  function deleteBug() {
    const confirmed = window.confirm(
      `Ok with deleting issue #${bug.id}?`
    );
    if (confirmed) {
      dispatch({
        type: "bug/delete",
        payload: bug.id
      });
    }
  }

  function navToManageBug() {
    navigate("/manage_bug", { state: { data: bug } });
  }

  return (
    <div 
      style={styles.root}
    >
      <div style={styles.topBar}>
        <div 
          style={styles.leftTopBar} 
          onClick={navToManageBug}
        >
          <p style={styles.id}>Issue: #{bug.id}</p>
        </div>
        <div style={styles.rightTopBar}>
          <MdDelete 
            onClick={deleteBug}
            style={styles.deleteIcon}
          />
        </div>
      </div>
      <div 
        style={styles.dataWrapper}
        onClick={navToManageBug}
      >
        <DataRow 
          prompt="Created on"
          data={`${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`}
        />
        <DataRow 
          prompt="Title"
          data={formattedData(bug.title)}
        />
      </div>
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "91%",
    borderRadius: "7px",
    backgroundColor: Colors.seven,
    marginTop: "25px",
    marginLeft: "20px"
  },

  topBar: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  leftTopBar: {
    width: "85%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },

  rightTopBar: {
    width: "85%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },

  deleteIcon: {
    fontSize: "1.215rem",
    marginRight: "10px",
    color: Colors.four,
    cursor: "pointer"
  },

  id: {
    fontSize: "1.325rem",
    fontFamily: "Arial",
    color: Colors.four,
    margin: "20px 20px"
  },

  dataWrapper: {
    cursor: "pointer",
    marginLeft: "10px"
  }
};
///////////////////////////////////////////