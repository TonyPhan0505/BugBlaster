////////////////// Import dependencies //////////////////
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Colors from "../utils/colors.utils";
import NavBar from "../components/shared/NavBar.component";
import BugCard from "../components/home/BugCard.component";
import Loader from '../components/shared/Loader.component';
import { useNavigate } from "react-router-dom";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function HomePage() {
  const [ searchText, setSearchText ] = useState("");
  const [ filterOption, setFilterOption ] = useState("Unfixed");
  const currentTeam = useSelector(state => state.team.currentTeam);
  const bugs = useSelector(state => state.bug.bugs);
  const hasFetchedBulk = useSelector(state => state.bug.hasFetchedBulk);
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "bug/fetch_bulk",
      payload: currentTeam.id
    });
  }, []);

  useEffect(() => {
    if (hasFetchedBulk === 1) {
      setLoading(false);
      dispatch({
        type: "bug/reset_fetch_bulk"
      });
    } else if (hasFetchedBulk === 0) {
      dispatch({
        type: "bug/reset_fetch_bulk"
      });
    }
  }, [hasFetchedBulk]);

  function getFilteredBugs() {
    if (filterOption === "Unfixed") {
      return bugs.filter((bug) => {
        return !bug.fixed;
      });
    } else {
      return bugs.filter((bug) => {
        return bug.fixed;
      });
    }
  }

  function navToAddBugPage() {
    navigate("/create_bug");
  }

  function navAction() {
    dispatch({
      type: "team/logout"
    });
    navigate("/");
  }

  function getBugs() {
    const filteredBugs = getFilteredBugs();
    if (!searchText) {
      return filteredBugs;
    }
    return filteredBugs.filter((bug) => {
      return (
        bug.id.toLowerCase().includes(searchText.toLowerCase())
          ||
        bug.briefDescription.toLowerCase().includes(searchText.toLowerCase())
          ||
        bug.detailedDescription.toLowerCase().includes(searchText.toLowerCase())
          ||
        bug.assignees.toLowerCase().includes(searchText.toLowerCase())
      )
    });
  }

  return (
    <div style={styles.root}>
      <NavBar 
        actionText="Log out"
        action={navAction}
      />
      <div style={styles.main}>
        <div style={styles.searchSortFrame}>
          <div style={styles.searchFrame}>
            <MdOutlineScreenSearchDesktop style={styles.searchIcon}/>
            <input 
              type="text"
              style={styles.searchField}
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div style={styles.sortFrame}>
            <button 
              onClick={() => setFilterOption("Fixed")} 
              style={ 
                filterOption === "Fixed" 
                  ? styles.chosenOptionButton 
                : styles.optionButton 
                }>Fixed</button>
            <button 
              onClick={() => setFilterOption("Unfixed")} 
              style={ 
                filterOption === "Unfixed" 
                  ? styles.chosenOptionButton 
                  : styles.optionButton 
              }>Unfixed</button>
          </div>
        </div>
        <button onClick={navToAddBugPage} style={styles.addBugButton}>Add new bug</button>
        <div style={styles.bugsFrame}>
          {
            loading ?
              <Loader loading={loading}/>
            : 
              <>
                {
                  getBugs().map((bug) => {
                    return (
                      <BugCard key={bug.id} bug={bug}/>
                    )
                  })
                }
              </>
          }
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
    minHeight: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    alignItems: "center"
  },

  searchSortFrame: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  searchFrame: {
    width: "55%",
    display: "flex",
    alignItems: "center"
  },

  searchIcon: {
    fontSize: "1.9rem",
    color: Colors.two,
    marginLeft: "20px",
    marginRight: "5px"
  },

  sortFrame: {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },

  searchField: {
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: "0px",
    borderBottomWidth: "2px",
    borderColor: Colors.three,
    width: "12.5rem",
    fontSize: '1.2rem'
  },

  chosenOptionButton: {
    width: "6.5rem",
    height: "1.9rem",
    backgroundColor: Colors.two,
    borderWidth: "0",
    borderRadius: "5px",
    color: Colors.five,
    fontSize: "0.95rem",
    marginRight: "20px",
    cursor: "pointer"
  },

  optionButton: {
    width: "6.5rem",
    height: "1.9rem",
    border: `2px solid ${Colors.two}`,
    backgroundColor: Colors.five,
    borderRadius: "5px",
    marginRight: "20px",
    color: Colors.six,
    fontSize: "0.95rem",
    cursor: "pointer"
  },

  addBugButton: {
    width: "10.25rem",
    height: "40px",
    border: "0",
    borderRadius: "5px",
    backgroundColor: Colors.two,
    marginTop: "50px",
    fontSize: "1rem",
    color: Colors.five,
    cursor: "pointer"
  },

  bugsFrame: {
    width: "22.25rem",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
///////////////////////////////////////////