////////////////// Import dependencies //////////////////
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";

import NavBar from "../components/shared/NavBar.component";
import BugCard from "../components/home/BugCard.component";
import Loader from '../components/shared/Loader.component';

import Colors from "../utils/Colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function HomePage() {
  const currentProject = useSelector(state => state.project.currentProject);
  const bugs = useSelector(state => state.bug.bugs);
  const hasFetchedBulk = useSelector(state => state.bug.hasFetchedBulk);

  const [ searchText, setSearchText ] = useState("");
  const [ filterOption, setFilterOption ] = useState("Unfixed");
  const [ loading, setLoading ] = useState(true);
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

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
    dispatch({
      type: "bug/fetch_bulk",
      payload: currentProject.uniqueName
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

  return (
    <div style={styles.root}>
      <NavBar 
        actionText="Log out"
        action={navAction}
      />
      <div style={isMobile ? styles.mobileMain : styles.main}>
        <div style={styles.liveLinkFrame}>
          <p style={styles.projectName}>{
            currentProject.uniqueName
          }</p>
        </div>
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
        <div style={styles.addBugButtonWrapper}>
          <button 
            onClick={navToAddBugPage} 
            style={styles.addBugButton}
          >Add new issue</button>
        </div>
        <div style={isMobile ? styles.mobileBugsFrame : styles.bugsFrame}>
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

  mobileMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px"
  },

  main: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    alignItems: "center"
  },

  liveLinkFrame: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },

  projectName: {
    fontSize: "1.4rem",
    fontFamily: "Arial",
    marginLeft: "12px",
    marginTop: "0px"
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
    marginLeft: "12px",
    marginRight: "0.3125rem"
  },

  mobileSearchField: {
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: "0px",
    borderBottomWidth: "2px",
    borderColor: Colors.three,
    width: "82%",
    fontSize: '1.1rem'
  },

  searchField: {
    borderRadius: "0.3125rem",
    backgroundColor: Colors.seven,
    border: "0px",
    width: "44%",
    padding: "0.4375rem",
    fontSize: '1.1rem'
  },

  mobileSortFrame: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: "12px"
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
    marginLeft: "12px",
    marginTop: "30px"
  },

  addBugButtonWrapper: {
    width: "100%",
    display: "flex"
  },

  addBugButton: {
    width: "9rem",
    height: "2.3875rem",
    border: "0",
    borderRadius: "5px",
    backgroundColor: Colors.four,
    marginLeft: "12px",
    marginTop: "1.125rem",
    fontSize: "1rem",
    color: Colors.five,
    cursor: "pointer"
  },

  mobileBugsFrame: {
    width: "80%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column"
  },

  bugsFrame: {
    width: "48%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
///////////////////////////////////////////