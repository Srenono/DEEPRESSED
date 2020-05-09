import React from "react";
import {withRouter} from 'react-router-dom'

import 'assets/css/Main.css'
import CancelNavbar from "../components/Navbars/CancelNavbar"

import PolicyContent from "components/__PolicyContent"




class Policy extends React.Component {
   

    render() {

      return (
        <>
        
        <CancelNavbar />
        
     <PolicyContent></PolicyContent>
     
     </>
      );
    }
  }
  
  export default withRouter(Policy);
  