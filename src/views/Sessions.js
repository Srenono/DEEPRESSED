import React from "react";
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore} from '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import 'assets/css/Main.css'
import ChatBoard from "./ChatBoard"

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

// sections for this page/view

import { Container, Row, Col,Card,CardBody,Button} from "reactstrap";




class Sessions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading: true,
        isOpenDialogConfirmLogout: false,
        currentPeerUser: null,
        SHOW: '',
    }
    this.currentUserId = localStorage.getItem(AppString.ID)
    this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL)
    this.currentUserFullname = localStorage.getItem(AppString.FULLNAME)
    this.listUser = []
    this.onChange = (state) => {
        this.setState(state);
      }
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
 onUserClick = (item) =>{
    this.setState({currentPeerUser: item.data()})
    this.setState({SHOW: 'none'})
    this.onUserClick.bind(this)
    return this.state.currentPeerUser

 }
renderListUser = () => {
    
    if (this.listUser.length > 0) {
        let viewListUser = []
        this.listUser.forEach((item, index) => {
            if (item.data().id !== this.currentUserId) {
                viewListUser.push(
                    <Row  className="  mx-auto " style={{maxHeight:"100px",width:"98%"}}>
                    <Card className="card-register">

            <CardBody style={{display:"flex" ,cursor:"pointer"}}
                
                        key={index}
                        
                        onClick={() => {
                            this.onUserClick(item)
                           

                        }}
                    >
                        <img
                            className="viewAvatarItem"
                            src={item.data().photoUrl}
                            alt="icon avatar"
                        />
                        <div className="viewWrapContentItem">
            <span style={{color:"rgba(255,255,255,0.5)"}} className="textItem">{` ${
                item.data().fullName
                }`}</span>
                            <span className="textItem">{` ${
                                item.data().aboutMe ? item.data().aboutMe : 'Seance gratuit de psychologie...'
                                }`}</span>
                        </div>
                 </CardBody>
             </Card>
             </Row>


                )
            }
        })
        return viewListUser
    } else {
        return null
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
        <IndexNavbar   />
    <Container >
    
    <div style={{marginTop:"66px" ,display:this.state.SHOW }} > {this.renderListUser()}</div>
    {this.state.currentPeerUser ? (
        <div style={{marginTop:"66px"  }} > 
        <ChatBoard
            currentPeerUser={this.state.currentPeerUser}
            showToast={this.props.showToast}
        /></div>
    ) : (
        <div></div>
    )}
    </Container>
    
        </>
      );
    }
  }
  
  export default withRouter(Sessions);
  