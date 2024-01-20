/////////////////////////// Import Dependencies ///////////////////////////
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/SignUp.page";
import HomePage from "./pages/home.page";
import CreateBugPage from "./pages/CreateBug.page";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
//////////////////////////////////////////////////////////////////////////

/////////////////////////// Component ///////////////////////////
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginPage />}/>
            <Route exact path="/sign_up" element={<SignUpPage />}/>
            <Route exact path="/home" element={<HomePage />}/>
            <Route exact path="/create_bug" element={<CreateBugPage />}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}
////////////////////////////////////////////////////////////////

export default App;