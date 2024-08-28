////////////////// Import dependencies //////////////////
import React, { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataRow from '../shared/DataRow.component';

import Colors from "../../utils/colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function BugCard({ bug }) {
  const datetime = new Date(bug.datetime);
  const dispatch = useDispatch();
  const hasDeleted = useSelector(state => state.bug.hasDeleted);
  const currentTeam = useSelector(state => state.team.currentTeam);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasDeleted === 1) {
      dispatch({
        type: "bug/reset_delete"
      });
      dispatch({
        type: "bug/fetch_bulk",
        payload: currentTeam.id
      });
    } else if (hasDeleted === 0) {
      dispatch({
        type: "bug/reset_delete"
      });
      window.alert("Failed to delete bug.");
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
      "Are you sure you want to delete this bug?"
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
    <div style={styles.root}>
      <div style={styles.topBar}>
        <div style={styles.leftTopBar} onClick={navToManageBug}>
          <p style={styles.id}>Bug: #{bug.id}</p>
        </div>
        <div style={styles.rightTopBar}>
          <MdDelete 
            onClick={deleteBug}
            style={styles.deleteIcon}
          />
        </div>
      </div>
      <DataRow 
        prompt="Created on"
        data={`${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`}
      />
      <DataRow 
        prompt="Brief description"
        data={formattedData(bug.briefDescription)}
      />
      <DataRow 
        prompt="Assignees"
        data={formattedData(bug.assignees)}
      />
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "21.25rem",
    borderRadius: "7px",
    border: `2px solid ${Colors.one}`,
    marginTop: "25px",
    paddingBottom: "10px"
  },

  topBar: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  leftTopBar: {
    width: "85%",
    display: "flex",
    alignItems: "center"
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
    color: Colors.two,
    margin: "12px 10px",
    cursor: "pointer"
  }
};
///////////////////////////////////////////