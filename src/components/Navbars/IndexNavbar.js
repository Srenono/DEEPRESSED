
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import profile from "assets/img/user-off.svg";
import logoS from "assets/img/main_on.png";
import Profile from "../../views/Profile";
import {withRouter} from 'react-router-dom'





class IndexNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "bg-info"
    };
  }

  onProfileClick = () => {
    this.props.history.push('/Profile')
}
onMainClick = () => {
  this.props.history.push('/Main')
}
onChatClick = () => {
  this.props.history.push('/Profile')
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
      <Navbar style={{boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)"}}className="fixed-top bg-neutral" expand="lg">
      <Container style={{height:"45px"}}>


        <nav  expand="lg" className="fixed-top navbar-dark navbar-expand justify-content-center" style={{paddingTop: "12px"}} Navbar>
        <div className="container" >
        <ul className="navbar-nav nav-justified w-150 text-center"  >
        <li className="nav-item"  >
        <img
        style={{color:"#bcbcbc",width:"54px",cursor:"pointer", marginLeft:"-50%",marginTop:"0px" }} 
        
        alt="An icon logout"
        src={profile}
        onClick={this.onProfileClick}
                    >
    
    </img>
        </li> 
        <li className="nav-item">
        <img
            style={{color:"#bcbcbc",width:"54px",cursor:"pointer", marginTop:"0px" }} 
            onClick={this.onMainClick}
            alt="An icon logout"
            src={logoS}
                        >
        
        </img>
        </li> 
        <li className="nav-item">
        <i 
        style={{color:"#bcbcbc",fontSize:"44px",marginRight:"-50%",marginTop:"7px"
        ,cursor:"pointer"}} 
        className="fas fa-comment"></i>
        
        </li> 
        </ul>
    </div>
</nav>
</Container>
    </Navbar>
  
    );
  }
}

export default withRouter(IndexNavbar);
