import React from "react";
import {withRouter} from 'react-router-dom'
import 'assets/css/Main.css'
import CancelNavbar from "../components/Navbars/CancelNavbar"
import BasicInfoContent from "components/__BasicInfoContent";


class BasicInfoForm extends React.Component {

  render() {

    return (
      <>

      <CancelNavbar />
   <BasicInfoContent/>
   </>
    );
  }
}

  export default withRouter(BasicInfoForm);
