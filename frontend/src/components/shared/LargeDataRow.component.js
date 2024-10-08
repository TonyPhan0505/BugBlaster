////////////////// Import dependencies //////////////////
import React from 'react';

import Colors from "../../utils/Colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function LargeDataRow({ prompt, data }) {
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
        margin: "10px 20px"
      },
    
    prompt: {
      fontSize: "1.167rem",
      fontFamily: "Arial",
      color: Colors.three,
      marginTop: "0px",
      marginBottom: "0px",
      marginLeft: "0px",
      marginRight: "5px"
    },
  
    data: {
      fontSize: "1.055rem",
      fontFamily: "Arial",
      color: Colors.six,
      margin: "0px"
    }
};
///////////////////////////////////////////