
import React from "react";
// reactstrap components
import {Navbar,Container} from "reactstrap";

import 'assets/css/style.css'

import {withRouter} from 'react-router-dom'
import {myFirebase} from '../../conf/MyFirebase'





class CancelNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "bg-info"
    };
  }

  doLogout = () => {
    this.setState({isLoading: true})
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            this.setState({isLoading: false}, () => {
                localStorage.clear()
                //.props.showToast(1, 'Logout success')
                this.props.history.push('/')
            })
        })
        .catch(function (err) {
            this.setState({isLoading: false})
           // this.props.showToast(0, err.message)
        })
}
 



 

  render() {
    return (

      <Navbar className="fixed-top navbar-transparent" expand="lg">
      <Container style={{height:"45px"}}>


        <nav  expand="lg" className="fixed-top navbar-dark navbar-expand justify-content-center" style={{paddingTop: "12px"}} >
        <div className="container" >
        <ul className="navbar-nav nav-justified w-150 text-center"  >
        <li className="nav-item"  >
        <i
        style={{color:"#fff",fontSize:"37px",marginLeft:"-85%",marginTop:"5px",display:"inline-block",cursor:"pointer"}} 
        className="icon-cancel_circle"
        onClick={this.doLogout}>
        </i>
        </li> 
       </ul>
    </div>
</nav>
</Container>
    </Navbar>
  
    );
  }
}

export default withRouter(CancelNavbar);
