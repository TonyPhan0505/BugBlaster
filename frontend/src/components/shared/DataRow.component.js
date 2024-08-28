////////////////// Import dependencies //////////////////
import React from 'react';

import Colors from "../../utils/colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function DataRow({ prompt, data }) {
  return (
    <div style={styles.row}>
        <p style={styles.prompt}>{prompt}:</p>
        <p style={styles.data}>{data}</p>
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        margin: "10px 10px"
      },
    
      prompt: {
        fontSize: "1rem",
        fontFamily: "Arial",
        color: Colors.six,
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: "0px",
        marginRight: "5px"
      },
    
      data: {
        fontSize: "1rem",
        fontFamily: "Arial",
        color: Colors.six,
        margin: "0px"
      }
};
///////////////////////////////////////////