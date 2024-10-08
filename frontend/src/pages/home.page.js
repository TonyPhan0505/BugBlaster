////////////////// Import dependencies //////////////////
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";

import NavBar from "../components/shared/NavBar.component";
import BugCard from "../components/home/BugCard.component";
import Loader from '../components/shared/Loader.component';

import Colors from "../utils/Colors.utils";
import { showErrorAlert } from "../utils/Alerts.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function HomePage() {
  const accessToken = localStorage.getItem("accessToken");

  const isLoggedIn = useSelector(state => state.project.isLoggedIn);
  const currentProject = useSelector(state => state.project.currentProject);
  const hasVerifiedAccessToken = useSelector(state => state.project.hasVerifiedAccessToken);
  const validAccessToken = useSelector(state => state.project.validAccessToken);
  const bugs = useSelector(state => state.bug.bugs);
  const hasFetchedBulk = useSelector(state => state.bug.hasFetchedBulk);

  const [ searchText, setSearchText ] = useState("");
  const [ filterOption, setFilterOption ] = useState("Unfixed");
  const [ loading, setLoading ] = useState(true);
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || isLoggedIn !== 1) {
      logOut();
    } else {
      dispatch({
        type: "project/verify_access_token",
        payload: accessToken
      });
    }
  }, []);

  useEffect(() => {
    if (hasVerifiedAccessToken === 1) {
      dispatch({
        type: "project/reset_verify_access_token"
      });
      if (!validAccessToken) {
        logOut();
      } else {
        dispatch({
          type: "bug/fetch_bulk",
          payload: currentProject.uniqueName
        });
      }
    } else if (hasVerifiedAccessToken === 0) {
      dispatch({
        type: "project/reset_verify_access_token"
      });
      showErrorAlert("ERROR: Failed to verify access token.");
    }
  }, [hasVerifiedAccessToken]);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
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

  function logOut() {
    dispatch({
      type: "project/logout"
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
        bug.title.toLowerCase().includes(searchText.toLowerCase())
          ||
        bug.detailedDescription.toLowerCase().includes(searchText.toLowerCase())
      )
    });
  }

  function openApp() {
    if (currentProject.link) {
      window.open(currentProject.link, "_blank");
    }
  }

  return (
    <div style={styles.root}>
      <NavBar 
        actionText="Log out"
        action={logOut}
      />
      <div style={styles.infoFrame}>
        <p style={styles.projectName}>{
          currentProject.uniqueName
        }</p>
        {!isMobile && (<button 
          style={styles.openAppButton}
          onClick={openApp}
        >
          Open app
        </button>)}
        {!isMobile && (<button 
          onClick={navToAddBugPage} 
          style={styles.addBugButton}
        >Add issue</button>)}
      </div>
      {isMobile && (<div style={styles.buttonsFrame}>
        <button 
          style={styles.openAppButton}
          onClick={openApp}
        >
          Open app
        </button>
        <button 
          onClick={navToAddBugPage} 
          style={styles.addBugButton}
        >Add issue</button>
      </div>)}
      <div style={styles.dividerWrapper}>
        <div style={styles.divider}/>
      </div>
      <div style={isMobile ? styles.mobileSearchSortFrame : styles.searchSortFrame}>
        <div style={isMobile ? styles.mobileSearchFrame : styles.searchFrame}>
          <MdOutlineScreenSearchDesktop style={styles.searchIcon}/>
          <input 
            type="text"
            style={isMobile ? styles.mobileSearchField : styles.searchField}
            placeholder="search by id, title, description"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div style={isMobile ? styles.mobileSortFrame : styles.sortFrame}>
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
      {isMobile && (<div style={styles.divider}/>)}
      <>
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
      </>
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "30px"
  },

  infoFrame: {
    width: "100%",
    display: "flex",
    marginTop: "30px"
  },

  buttonsFrame: {
    display: "flex",
    alignItems: "center"
  },

  projectName: {
    fontSize: "1.2rem",
    fontFamily: "Arial",
    fontWeight: "bold",
    marginLeft: "20px",
    marginTop: "0px"
  },

  openAppButton: {
    marginLeft: "20px",
    width: "6.5rem",
    height: "2.3875rem",
    backgroundColor: Colors.six,
    borderWidth: "0",
    borderRadius: "5px",
    color: Colors.five,
    fontSize: "0.9rem",
    marginRight: "12px",
    cursor: "pointer"
  },

  dividerWrapper: {
    width: "100%",
    marginBottom: "0.9375rem"
  },

  mobileSearchSortFrame: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },

  searchSortFrame: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },

  mobileSearchFrame: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "15px"
  },

  searchFrame: {
    width: "60%",
    display: "flex",
    alignItems: "center"
  },

  searchIcon: {
    fontSize: "1.9rem",
    color: Colors.two,
    marginLeft: "20px",
    marginRight: "0.3125rem"
  },

  mobileSearchField: {
    borderRadius: "0.3125rem",
    backgroundColor: Colors.seven,
    border: "0px",
    width: "70%",
    padding: "0.4375rem",
    fontSize: '1.1rem'
  },

  searchField: {
    borderRadius: "0.3125rem",
    backgroundColor: Colors.seven,
    border: "0px",
    width: "44%",
    padding: "0.7rem 0.4375rem",
    fontSize: '1.1rem'
  },

  mobileSortFrame: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px"
  },

  sortFrame: {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },

  chosenOptionButton: {
    width: "6.5rem",
    height: "2.2rem",
    backgroundColor: Colors.four,
    borderWidth: "0",
    borderRadius: "5px",
    color: Colors.five,
    fontSize: "0.95rem",
    marginRight: "20px",
    cursor: "pointer"
  },

  optionButton: {
    width: "6.5rem",
    height: "2.2rem",
    backgroundColor: Colors.eight,
    border: "0px",
    borderRadius: "5px",
    marginRight: "20px",
    color: Colors.five,
    fontSize: "0.95rem",
    cursor: "pointer"
  },

  divider: {
    width: "4rem",
    height: "2px",
    backgroundColor: Colors.six,
    marginLeft: "20px",
    marginTop: "30px"
  },

  addBugButton: {
    width: "7rem",
    height: "2.3875rem",
    border: "0",
    borderRadius: "5px",
    backgroundColor: Colors.three,
    fontSize: "0.9rem",
    color: Colors.five,
    cursor: "pointer"
  }
};
///////////////////////////////////////////