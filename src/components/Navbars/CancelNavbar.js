
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {Navbar,Container} from "reactstrap";

import 'assets/css/style.css'

import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore, myStorage} from '../../conf/MyFirebase'





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
 



  /*
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };*/
  


  render() {
    return (
      /*<Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >*/
      <Navbar className="fixed-top navbar-transparent" expand="lg">
      <Container style={{height:"45px"}}>


        <nav  expand="lg" className="fixed-top navbar-dark navbar-expand justify-content-center" style={{paddingTop: "12px"}} Navbar>
        <div className="container" >
        <ul className="navbar-nav nav-justified w-150 text-center"  >
        <li className="nav-item"  >
        <i 
        style={{color:"#fff",fontSize:"28px",marginLeft:"-85%",marginTop:"5px",display:"inline-block",borderRadius: "60px",padding:" 0.3em 0.3em",border:"2px solid #fff",cursor:"pointer"}} 
        className="tim-icons icon-simple-remove"
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
