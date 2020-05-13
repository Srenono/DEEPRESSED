import React from "react";
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore} from '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import 'assets/css/Main.css'
import ChatBoard from "./ChatBoard"
import Sessions from "./Sessions"

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

// sections for this page/view

import { Container, Row, Col,Card,CardBody,Button} from "reactstrap";




class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading: true,
        isOpenDialogConfirmLogout: false,
        
    }
    const User = Sessions.user
    console.log(User)
    
    
    }
 


componentDidMount() {
    this.checkLogin()
}

checkLogin = () => {
    if (!localStorage.getItem(AppString.ID)) {
        this.setState({isLoading: false}, () => {
            this.props.history.push('/')
        })
    } else {
        
    }
}


    render() {
		var sectionStyle = {
		width: "100%",
		height: "100vh",
		backgroundColor: '',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		color:'neutral'
		};
      return (
        <>
        <IndexNavbar  />
    <Container >
    
    {this.state.currentPeerUser ? (
        <ChatBoard
            currentPeerUser={this.state.currentPeerUser}
            showToast={this.props.showToast}
        />
    ) : (
        <div></div>
    )}

    </Container>
    
        </>
      );
    }
  }
  
  export default withRouter(Chat);
  