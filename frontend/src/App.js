/////////////////////////// Import Dependencies ///////////////////////////
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/SignUp.page";
import HomePage from "./pages/home.page";
import CreateBugPage from "./pages/CreateBug.page";
import ManageBugPage from "./pages/ManageBug.page";

import { store, persistor } from './redux/store';

import "./styles/main.css";
//////////////////////////////////////////////////////////////////////////

/////////////////////////// Component ///////////////////////////
function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginPage />}/>
            <Route exact path="/sign_up" element={<SignUpPage />}/>
            <Route exact path="/home" element={<HomePage />}/>
            <Route exact path="/create_bug" element={<CreateBugPage />}/>
            <Route exact path="/manage_bug" element={<ManageBugPage />}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}
////////////////////////////////////////////////////////////////

export default App;