////////////////// Import dependencies //////////////////
import React, { useState } from 'react';
import NavBar from '../components/shared/NavBar.component';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Colors from "../utils/colors.utils";
import LargeDataRow from '../components/shared/LargeDataRow.component';
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function ManageBugPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const bug = location.state.data;
    const datetime = new Date(bug.datetime);
    const [ briefDescription, setBriefDescription ] = useState(bug.briefDescription);
    const [ detailedDescription, setDetailedDescription ] = useState(bug.detailedDescription);
    const [ assignees, setAssignees ] = useState(bug.assignees);
    const [ updates, setUpdates ] = useState(bug.updates);
    const [ solution, setSolution ] = useState(
        bug.solution ? bug.solution : ""
    );

    function navAction() {
        dispatch({
          type: "team/logout"
        });
        navigate("/");
    }

    function formattedData(data) {
        let formatted = data;
        if (formatted[formatted.length - 1] !== ".") {
          formatted = formatted + ".";
        }
        return formatted;
    }

    return (
        <div style={styles.root}>
            <NavBar 
                actionText="Log out"
                action={navAction}
            />
            <div style={styles.main}>
                <div style={styles.innerMain}>
                    <p style={styles.id}>Bug: #{bug.id}</p>
                    <LargeDataRow 
                        prompt="Status"
                        data={bug.solution ? "Fixed" : "Unfixed"}
                    />
                    <LargeDataRow 
                        prompt="Created on"
                        data={`${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`}
                    />
                    <p style={styles.prompt}>Brief description:</p>
                    <input 
                        type="text"
                        style={styles.singleLineInputField}
                        placeholder="brief description"
                        value={formattedData(briefDescription)}
                        onChange={(e) => setBriefDescription(e.target.value)}
                        maxLength={23}
                    />
                    <p style={styles.prompt}>Detailed description:</p>
                    <textarea
                        value={formattedData(detailedDescription)}
                        placeholder="Detailed description"
                        onChange={(e) => setDetailedDescription(e.target.value)}
                        rows={3}
                        style={styles.multilineInputField}
                    />
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
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
    },

    innerMain: {
        width: "40%",
        display: "flex",
        flexDirection: "column"
    },

    id: {
        fontSize: "1.8rem",
        fontFamily: "Arial",
        color: Colors.four,
        fontWeight: "bold",
        marginLeft: "10px"
    },

    prompt: {
        fontSize: "1.167rem",
        fontFamily: "Arial",
        color: Colors.four,
        marginTop: "10px",
        marginBottom: "0px",
        marginLeft: "0px",
        marginLeft: "10px"
    },

    singleLineInputField: {
        width: "100%",
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
        width: "100%",
        borderWidth: '0',
        backgroundColor: Colors.seven,
        fontSize: '1.055rem',
        fontFamily: "Arial",
        padding: "12px",
        borderRadius: "5px",
        marginTop: "20px"
    },
};
///////////////////////////////////////////