import React from "react";
import firebase from 'firebase'
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore} from '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import logout from '../assets/img/ic_logout.png'
import 'assets/css/Main.css'


// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

// sections for this page/view

import { Container, Row, Col ,Button } from "reactstrap";




class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading: true,
        isOpenDialogConfirmLogout: false,
        currentPeerUser: null
    }
    this.currentUserId = localStorage.getItem(AppString.ID)
    this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL)
    this.currentUserNickname = localStorage.getItem(AppString.NICKNAME)
    this.listUser = []
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
        this.getListUser()
    }
}

getListUser = async () => {
    const result = await myFirestore.collection(AppString.NODE_USERS).get()
    if (result.docs.length > 0) {
        this.listUser = [...result.docs]
        this.setState({isLoading: false})
    }
}

onLogoutClick = () => {
    this.setState({
        isOpenDialogConfirmLogout: true
    })
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

hideDialogConfirmLogout = () => {
    this.setState({
        isOpenDialogConfirmLogout: false
    })
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
        <IndexNavbar />
        <div className="wrapper">
		   <section style={ sectionStyle }>
    <div  style={{width:"100%",height:"180px",borderRadius:"0", background: "#FFFFFF",position:"absolute"}}></div>
    <div  style={{width:"100%",height:"50px",borderRadius:"50%", background: "#FFFFFF",position:"absolute",top:"158px",boxShadow: "0px 1px 1px #bcbcbc"}}></div>

    <div>
    
		<Container >

			  <Row className="justify-content-md-center">

            <Col className="text-center" lg="8" md="12">
            <div >
              <h3 className="title" style={{marginTop:"100px", color: "#757575"}}>
              <Button  style={{fontWeight:"600",backgroundColor: "#3f51b5",borderRadius:"50px",backgroundImage: "linear-gradient(to bottom right, #3f51b5, #9c27b0)"}} >
              DEMARER VOTRE SEANCE <i style={{fontSize:"17px",marginLeft:"15px", marginRight:"-25px",marginTop:"-5px"}}className="fas fa-paper-plane"></i></Button>
              </h3>
              <div className="root">
                {/* Header */}
                <div >
                    
                    <img
                        className="icLogout"
                        alt="An icon logout"
                        src={logout}
                        onClick={this.doLogout}
                        
                    /> 
                </div>
                </div>
                </div>
                </Col>


          </Row>
		</Container>

		  </div>
      </section>
      {/* Loading */}
      {this.state.isLoading ? (
        <div className="viewLoading">
            <ReactLoading
                type={'spin'}
                color={'#203152'}
                height={'3%'}
                width={'3%'}
            />
        </div>
    ) : null}
      </div>
     </>
      );
    }
  }
  
  export default withRouter(Main);
  