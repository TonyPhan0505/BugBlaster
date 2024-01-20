////////////////// Import dependencies //////////////////
import React from 'react';
import Colors from "../../utils/colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function BugCard({ bug }) {
  const datetime = new Date(bug.datetime);

  return (
    <div style={styles.root}>
      <p style={styles.id}>Bug Id: {bug.id}</p>
      <p style={styles.datetime}>{datetime.getFullYear()}/{datetime.getMonth() + 1}/{datetime.getDate()}</p>
      <p style={styles.briefDescription}>{bug.briefDescription}</p>
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
    paddingTop: "10px",
    paddingBottom: "20px",
    paddingLeft: "10px",
    borderRadius: "7px",
    border: `2px solid ${Colors.four}`
  },

  id: {
    fontSize: "1.325rem",
    fontFamily: "Arial",
    color: Colors.four
  },

  datetime: {
    fontSize: "1rem",
    fontFamily: "Arial",
    color: Colors.four
  },

  briefDescription: {
    fontSize: "1rem",
    fontFamily: "Arial",
    color: Colors.six
  }
};
///////////////////////////////////////////