////////////////// Import dependencies //////////////////
import React from 'react';
import NavBar from "../components/shared/NavBar.component";
import Form from "../components/login/Form.component";
import Colors from "../utils/colors.utils";
import { useNavigate } from "react-router-dom";
////////////////////////////////////////////////////////

////////////////// Component //////////////////
export default function LoginPage() {
  const navigate = useNavigate();

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
    height: window.innerHeight - 200,
    backgroundColor: Colors.five
  }
};
///////////////////////////////////////////