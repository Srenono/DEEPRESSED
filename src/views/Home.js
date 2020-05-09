import React from "react";
import firebase from 'firebase'
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore} from '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import logo from '../assets/img/LOGO_BIG.png'
import Background from '../assets/img/background_home.jpg'
import 'react-toastify/dist/ReactToastify.css'



// sections for this page/view
import { Container, Row, Col ,Button } from "reactstrap";




class Home extends React.Component {
  constructor(props) {
    super(props)
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.state = {
        isLoading: true
    }
}

componentDidMount() {
    this.checkLogin()
}

checkLogin = () => {
    if (localStorage.getItem(AppString.POLICY_CHECK)) {
        this.setState({isLoading: false}, () => {
            this.setState({isLoading: false})
            this.props.showToast(1, 'Login success')
            this.props.history.push('/main')
        })
    } else if(localStorage.getItem(AppString.ID)){
        this.props.history.push('/policy')
        this.setState({isLoading: false})
    }else{
        this.props.history.push('/')
        this.setState({isLoading: false})
    }
}

onLoginPress = () => {
    
    this.setState({isLoading: true})
    myFirebase
        .auth()
        .signInWithPopup(this.googleProvider)
        .then(async result => {
            let user = result.user
            if (user) {
                const result = await myFirestore
                    .collection(AppString.NODE_USERS)
                    .where(AppString.ID, '==', user.uid)
                    .get()

                if (result.docs.length === 0) {
                    // Set new data since this is a new user
                    myFirestore
                        .collection('users')
                        .doc(user.uid)
                        .set({
                            id: user.uid,
                            number: '',
                            fullName: user.displayName,
                            sexe:'',
                            dateOfBirth:'',
                            firstQuestion:'',
                            secondQuestion:'',
                            thirdQuestion:'',
                            expressSection: '',
                            policyCheck: false,
                            photoUrl: user.photoURL
                        })
                        .then(data => {
                            // Write user info to local
                            localStorage.setItem(AppString.ID, user.uid)
                            localStorage.setItem(AppString.FULLNAME, user.displayName)
                            localStorage.setItem(AppString.PHOTO_URL, user.photoURL)
                            localStorage.setItem(AppString.POLICY_CHECK, user.policyCheck)
                            localStorage.setItem(AppString.NODE_USERS, 'users')

                            this.setState({isLoading: false}, () => {
                               this.props.showToast(1, 'Login success')
                                this.props.history.push('/policy')
                            })
                        })
                } else {
                    // Write user info to local
                    localStorage.setItem(AppString.ID, result.docs[0].data().id)
                    localStorage.setItem(
                        AppString.FULLNAME,
                        result.docs[0].data().fullName
                    )
                    localStorage.setItem(
                        AppString.PHOTO_URL,
                        result.docs[0].data().photoUrl
                    )
                    localStorage.setItem(
                        AppString.SEXE,
                        result.docs[0].data().sexe
                    )
                    localStorage.setItem(
                        AppString.DATE_OF_BIRTH,
                        result.docs[0].data().dateOfBirth
                    )
                    localStorage.setItem(
                        AppString.FIRST_QUESTION,
                        result.docs[0].data().firstQuestion
                    )
                    localStorage.setItem(
                        AppString.SECOND_QUESTION,
                        result.docs[0].data().secondQuestion
                    )
                    localStorage.setItem(
                        AppString.THIRD_QUESTION,
                        result.docs[0].data().thirdQuestion
                    )
                    localStorage.setItem(
                        AppString.EXPRESS_SECTION,
                        result.docs[0].data().expressSection
                    )
                    localStorage.setItem(
                        AppString.POLICY_CHECK,
                        result.docs[0].data().policyCheck
                    )
                    
                    this.setState({isLoading: false}, () => {
                      this.props.showToast(1, 'Login success')
                        this.props.history.push('/main')
                    })
                }
            } else {
                this.props.showToast(0, 'User info not available')
            }
        })
        .catch(err => {
            console.log(err.message)
            this.setState({isLoading: false})
        })
}

    render() {
		var sectionStyle = {
		width: "100%",
		height: "100vh",
		backgroundImage: `url(${Background})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		color:'neutral'
		};
      return (
        
		   <section style={ sectionStyle }>
		<div  >
		<Container >
		
			  <Row className="justify-content-md-center">
			   <Col className="text-center" lg="8" md="12">
                <img  alt="DEEPRESSED" src={logo}  style={{ width: "250px" ,marginTop:"16%"}} /> 

            </Col>
            <Col className="text-center" lg="8" md="12">
              <h3 className="title" style={{ color: "#757575"}}>
                Commancer gratuitement votre session de psychologie maintenant!
              </h3>
              <h4 className="description"  style={{ color: "#FFFFFF"}}>
                En cliquant sur connexion vous acceptez nos condition d'utilisation. Consulter notre politique de confidientailité pour plus d'information
              </h4>
            </Col>
            {this.state.isLoading ? (
              <div 
              style={{ 
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }} 
              >
                  <ReactLoading
                      type={'spin'}
                      color={'#203152'}
                      height={'3%'}
                      width={'3%'}
                  />
              </div>
          ) : null}
			   <Col className="text-center" lg="8" md="12">
              <Button style={{ width: "266px",color: "#757575",fontWeight: "bold" }}
                className="btn-round "
                color="neutral"
                role="button"
                size="lg"
                onClick={this.onLoginPress}
              >
				<img   alt="G" src={require("assets/img/G.png")}  style={{ width: "20px" ,marginRight: "20%",marginLeft: "-22%"}} /> 
				 LOG IN  AVEC GOOGLE
              </Button>
			  </Col>
			   <Col className="text-center" lg="8" md="12">
              <Button style={{ width: "266px", color: "#757575",fontWeight: "bold" }}
                className="btn-round "
                color="neutral"
                role="button"
                size="lg"
              >
				<img  alt="F" src={require("assets/img/F.png")}  style={{ width: "20px" ,marginRight: "20%",marginLeft: "-22%"}} /> 
				 LOG IN AVEC FACEBOOK 
              </Button>
			  </Col>
			  <Col className="text-center" lg="8" md="12">
              <Button style={{ width: "266px",color: "#757575",fontWeight: "bold" }}
                className="btn-round "
                color="neutral"
                role="button"
                size="lg"
              >
				<img  alt="S" src={require("assets/img/S.png")}  style={{ width: "20px" ,marginRight: "20%",marginLeft: "-22%"}} /> 
				 LOG IN AVEC NUMERO
              </Button>
			  </Col>
			 
          </Row>
		</Container>

		  </div>
		  </section>
     
      );
    }
  }
  
  export default withRouter(Home);
  