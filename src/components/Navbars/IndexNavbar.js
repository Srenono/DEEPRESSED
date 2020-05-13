
import React from "react";
// reactstrap components
import {

  Navbar,
  Container,
  Row,
  Col,

} from "reactstrap";

import {withRouter , NavLink} from 'react-router-dom'





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
  this.props.history.push('/sessions')
}


  render() {
    return (
 
      <Navbar  className="fixed-top bg-neutral main-navbar" expand="lg">
      <nav  expand="lg" className="fixed-top navbar-dark navbar-expand main-nav"  >
      <Container className="main-container main-nav">
      <Row>
      <div className="main-nav-space"></div>
      <Col>
      <NavLink exact to="/Profile"
      className="main-nav-icon-profil"
      activeClassName="main-nav-icon-profil-active"
        ><i className="fas fa-user-circle"></i>
      </NavLink>
      </Col>
      <Col>
      <NavLink exact to="/main"
      className="main-nav-icon-deepressed"
      activeClassName="main-nav-icon-deepressed-active"
        ><i className="icon-main_on"></i>
      </NavLink>
      </Col>
      <Col>
      <NavLink exact to="/sessions"
      className="main-nav-icon-sessions"
      activeClassName="main-nav-icon-sessions-active"
        ><i className="fas fa-comment"></i>
      </NavLink>
        </Col>
        </Row>
</Container>
</nav>
    </Navbar>
  
    );
  }
}

export default withRouter(IndexNavbar);
