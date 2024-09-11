////////////////// Import dependencies //////////////////
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import NavBar from "../components/shared/NavBar.component";
import Form from "../components/login/Form.component";

import Colors from "../utils/Colors.utils";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home");
    }
  }, []);

  function navAction() {
    navigate("/sign_up");
  }

  return (
    <div>
      <NavBar 
        actionText="Sign up"
        action={navAction}
      />
      <div style={styles.main}>
        <Form/>
      </div>
    </div>
  )
}
/////////////////////////////////////////////

////////////////// Styles //////////////////
const styles = {
  main: {
    width: "100%",
    backgroundColor: Colors.five
  }
};
///////////////////////////////////////////