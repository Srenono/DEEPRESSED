import React from "react";
import firebase from 'firebase/app'
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore} from '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import logo from '../assets/img/LOGO_BIG-min.png'
import 'react-toastify/dist/ReactToastify.css'
import { Container, Row, Col ,Button } from "reactstrap";




class Home extends React.Component {
  constructor(props) {
    super(props)
    this.provider = new firebase.auth.GoogleAuthProvider()
    this.state = {
        isLoading: true
    }
}

componentDidMount() {
    this.checkLogin()
}

checkLogin = () => {
    if (localStorage.getItem(AppString.ID)) {
        this.setState({isLoading: false}, () => {
            this.setState({isLoading: false})
            //this.props.showToast(1, 'Login success')
            this.props.history.push('/main')
        })
    } else {
        this.setState({isLoading: false})
    }
}

onGoogleClick = () =>{
    this.provider = new firebase.auth.GoogleAuthProvider()
    this.onLoginPress()
}

onFacebookClick = () =>{
    this.provider = new firebase.auth.FacebookAuthProvider()
    this.onLoginPress()
}
onNumberClick = () =>{
    this.props.history.push('/phoneSignin')
}


onLoginPress = () => {
    this.setState({isLoading: true})
    myFirebase
        .auth()
        .signInWithPopup(this.provider)
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
                            number: '0611223344',
                            fullName: user.displayName,
                            sexe:'',
                            dateOfBirth:'',
                            firstQuestion:'',
                            secondQuestion:'',
                            thirdQuestion:'',
                            expressSection: '',
                            check: '',
                            photoUrl: user.photoURL
                        })
                        .then(data => {
                            // Write user info to local
                            localStorage.setItem(AppString.ID, user.uid)
                            localStorage.setItem(AppString.NUMBER, user.number)
                            localStorage.setItem(AppString.FULLNAME, user.displayName)
                            localStorage.setItem(AppString.PHOTO_URL, user.photoURL)
                            localStorage.setItem(AppString.CHECK, user.check)
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
                        AppString.NUMBER,
                        result.docs[0].data().number
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
                        AppString.CHECK,
                        result.docs[0].data().check
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
            this.props.showToast(0, err.message)
            this.setState({isLoading: false})
        })
}

    render() {

      return (

		   <section className="home-background">
		<div  >
		<Container >

			  <Row className="justify-content-md-center">
			   <Col className="text-center" lg="8" md="12">
                <img className="home-logo" alt="DEEPRESSED" src={logo}   /> 

            </Col>
            <Col className="text-center" lg="8" md="12">
              <h4 className="title" style={{ color: "#757575"}}>
                Commancer gratuitement votre session de psychologie maintenant!
              </h4>
              <h5 className="description"  style={{ color: "#FFFFFF"}}>
                En cliquant sur connexion vous acceptez nos condition d'utilisation. Consulter notre politique de confidientailité pour plus d'information
              </h5>
            </Col>
            {this.state.isLoading ? (
              <div className="home-loading">
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
                onClick={this.onGoogleClick}
              >
				<img   alt="G" src={require("assets/img/G.png")}  className="home-login-img" /> 
				 LOG IN  AVEC GOOGLE
              </Button>
			  </Col>
			   <Col className="text-center" lg="8" md="12">
              <Button style={{ width: "266px", color: "#757575",fontWeight: "bold" }}
                className="btn-round "
                color="neutral"
                role="button"
                size="lg"
				onClick={this.onFacebookClick}

              >
				<img  alt="F" src={require("assets/img/F.png")}  className="home-login-img" /> 
				 LOG IN AVEC FACEBOOK 
              </Button>
			  </Col>
			  <Col className="text-center" lg="8" md="12">
              <Button style={{ width: "266px",color: "#757575",fontWeight: "bold" }}
                className="btn-round "
                color="neutral"
                role="button"
                size="lg"
                onClick={this.onNumberClick}
              >
				<img  alt="S" src={require("assets/img/S.png")}  className="home-login-img" /> 
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
  