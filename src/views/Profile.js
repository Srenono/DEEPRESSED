import React from "react";
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore, myStorage} from  '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import logout from '../assets/img/ic_logout.png'
import 'assets/css/Main.css'
import UserPicM from "../assets/img/userPicM.png";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";

// sections for this page/view

import { Container, Row, Col ,Button } from "reactstrap";




class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            id: localStorage.getItem(AppString.ID),
            fullname: localStorage.getItem(AppString.FULLNAME),
            sexe: localStorage.getItem(AppString.SEXE),
            dateOfBirh: localStorage.getItem(AppString.DATE_OF_BIRTH),
            firstQuestion: localStorage.getItem(AppString.FIRST_QUESTION),
            secondQuestion: localStorage.getItem(AppString.SECOND_QUESTION),
            thridQuestion: localStorage.getItem(AppString.THIRD_QUESTION),
            policyCheck: localStorage.getItem(AppString.POLICY_CHECK),
            expressSection: localStorage.getItem(AppString.EXPRESS_SECTION)


        }
        this.newAvatar = null
        this.newPhotoUrl = ''
    }

    componentDidMount() {
        this.checkLogin()
    }

    checkLogin = () => {
        if (!localStorage.getItem(AppString.ID)) {
            this.props.history.push('/')
        }
    }

    onChangeNickname = event => {
        this.setState({nickname: event.target.value})
    }

    onChangeAboutMe = event => {
        this.setState({aboutMe: event.target.value})
    }

    onChangeAvatar = event => {
        if (event.target.files && event.target.files[0]) {
            // Check this file is an image?
            const prefixFiletype = event.target.files[0].type.toString()
            if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) !== 0) {
                this.props.showToast(0, 'This file is not an image')
                return
            }
            this.newAvatar = event.target.files[0]
            this.setState({photoUrl: URL.createObjectURL(event.target.files[0])})
        } else {
            this.props.showToast(0, 'Something wrong with input file')
        }
    }

    uploadAvatar = () => {
        this.setState({isLoading: true})
        if (this.newAvatar) {
            const uploadTask = myStorage
                .ref()
                .child(this.state.id)
                .put(this.newAvatar)
            uploadTask.on(
                AppString.UPLOAD_CHANGED,
                null,
                err => {
                    this.props.showToast(0, err.message)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.updateUserInfo(true, downloadURL)
                    })
                }
            )
        } else {
            this.updateUserInfo(false, null)
        }
    }

    updateUserInfo = (isUpdatePhotoUrl, downloadURL) => {
        let newInfo
        if (isUpdatePhotoUrl) {
            newInfo = {
                nickname: this.state.nickname,
                aboutMe: this.state.aboutMe,
                photoUrl: downloadURL
            }
        } else {
            newInfo = {
                nickname: this.state.nickname,
                aboutMe: this.state.aboutMe
            }
        }
        myFirestore
            .collection(AppString.NODE_USERS)
            .doc(this.state.id)
            .update(newInfo)
            .then(data => {
                localStorage.setItem(AppString.NICKNAME, this.state.nickname)
                localStorage.setItem(AppString.ABOUT_ME, this.state.aboutMe)
                if (isUpdatePhotoUrl) {
                    localStorage.setItem(AppString.PHOTO_URL, downloadURL)
                }
                this.setState({isLoading: false})
                this.props.showToast(1, 'Update info success')
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
    <div  style={{width:"100%",height:"280px",borderRadius:"0", background: "#FFFFFF",position:"absolute"}}></div>
    <div  style={{width:"100%",height:"100px",borderRadius:"50%", background: "#FFFFFF",position:"absolute",top:"230px",boxShadow: "0px 1px 1px #bcbcbc"}}></div>

    <div>
    
		<Container >

			  <Row className="justify-content-md-center">

            <Col className="text-center" lg="8" md="12">
            <div >
            <img
            alt="..."
            className="img-fluid rounded-circle shadow-lg"
            src={UserPicM}
            style={{ width: "150px",marginTop:"100px" }}
          />
          <h2 style={{ color: "#616161",textTransform:"uppercase",fontWeight:"600",   marginTop:"10px"}}>{this.state.fullname}, 24 </h2>
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
  
  export default withRouter(Profile);
  