/////////////////////////// Import Dependencies ///////////////////////////
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/SignUp.page";
import HomePage from "./pages/home.page";
import BugDetailsPage from "./pages/BugDetails.page";
//////////////////////////////////////////////////////////////////////////

/////////////////////////// Component ///////////////////////////
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />}/>
        <Route exact path="/sign_up" element={<SignUpPage />}/>
        <Route exact path="/home" element={<HomePage />}/>
        <Route exact path="/bug_details" element={<BugDetailsPage />}/>
      </Routes>
    </Router>
  );
}
////////////////////////////////////////////////////////////////

export default App;