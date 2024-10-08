////////////////// Import dependencies //////////////////
import React from 'react';
import { useNavigate } from "react-router-dom";

import NavBar from '../components/shared/NavBar.component';
import Form from '../components/sign_up/Form.component';

import Colors from "../utils/Colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function SignUpPage() {
  const navigate = useNavigate();

  function navAction() {
    navigate("/");
  }

  return (
    <div>
      <NavBar 
        actionText="Login"
        action={navAction}
      />
      <div style={styles.main}>
        <Form />
      </div>
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  main: {
    width: "100%",
    height: window.innerHeight - 200,
    backgroundColor: Colors.five
  }
};
///////////////////////////////////////////