import React from "react";
import {withRouter} from 'react-router-dom'
import 'assets/css/Main.css'
import CancelNavbar from "../components/Navbars/CancelNavbar"
import PhoneSigninContent from "components/__PhoneSigninContent";


class PhoneSignin extends React.Component {

  render() {

    return (
      <>

      <CancelNavbar />
   <PhoneSigninContent/>
   </>
    );
  }
}

  export default withRouter(PhoneSignin);
