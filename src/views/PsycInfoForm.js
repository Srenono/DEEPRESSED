import React from "react";
import 'assets/css/Main.css'
import BackNavbar from "../components/Navbars/BackNavbar"
import PsycInfoContent from "components/__PsycInfoContent";


class BasicInfoForm extends React.Component {

  render() {

    return (
      <>

      <BackNavbar />
   <PsycInfoContent/>
   </>
    );
  }
}

  export default (BasicInfoForm);
