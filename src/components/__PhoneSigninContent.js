
import React from "react";
// reactstrap components

import {
  Button,
  InputGroupAddon,
InputGroup,
InputGroupText,
  Input,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Container,
  Row,
  Col
} from "reactstrap";
import { myFirebase,myFirestore} from  '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import {withRouter} from 'react-router-dom'
import ReactLoading from 'react-loading'
import "assets/css/Glyphter.css"
import classnames from "classnames";




class PhoneSigninContent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        isLoading: false,
        inputFocus: false,

        id: localStorage.getItem(AppString.ID),
        phoneNumber: localStorage.getItem(AppString.NUMBER),
        codeVerification: '',
        displayPhone: 'block',
        displayCode:'none',
        confirmationResult:null,


            }
}

componentDidMount() {
   window.recaptchaVerifier = new myFirebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      this.onSignInSubmit();
    }
  })
  this.checkLogin()
}

checkLogin = () => {
  if (localStorage.getItem(AppString.ID)) {
      this.setState({isLoading: false}, () => {
          this.setState({isLoading: false})
          this.props.showToast(1, 'Login success')
          this.props.history.push('/main')
      })
  } else {
      this.setState({isLoading: false})
  }
}

onChangePhoneNumber = event => {
this.setState({phoneNumber:'+212'+ event.target.value})
}

onChangeCodeVerify = event => {
  this.setState({codeVerification: event.target.value})
  }




setUserInfo = () => {
let newInfo

  newInfo = {
    phoneNumber: '212' + this.state.phoneNumber,


      }
myFirestore
  .collection(AppString.NODE_USERS)
  .doc(this.state.id)
  .update(newInfo)
  .then(data => {
      localStorage.setItem(AppString.NUMBER, this.state.phoneNumber)


      this.setState({isLoading: false})
  })
}

 
onSignInSubmit = () => {
      //get the number
      this.setState({isLoading: true})
      var number= this.state.phoneNumber;
      localStorage.setItem(AppString.NUMBER, number)

      //phone number authentication function of firebase
      //it takes two parameter first one is number,,,second one is recaptcha
      myFirebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
          //s is in lowercase
          this.setState({confirmationResult: window.confirmationResult})
          

      }).catch(function (error) {
          alert(error.message);
      });
      this.setState({displayPhone: 'none'})
      this.setState({displayCode: 'block'})
      this.setState({isLoading: false})

  }


  onCodeVerify =() => {
    var code=this.state.codeVerification;
    this.confirmationResult.confirm(code).then(async result => {
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
                      number: this.state.phoneNumber,
                      fullName: '',
                      sexe:'',
                      dateOfBirth:'',
                      firstQuestion:'',
                      secondQuestion:'',
                      thirdQuestion:'',
                      expressSection: '',
                      check: '',
                      photoUrl: ''
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


setUserInfo = () => {
  this.setState({isLoading: true})
  let newInfo
    newInfo = {
      phoneNumber: '212' + this.state.phoneNumber,
  
  
        }
  myFirestore
    .collection(AppString.NODE_USERS)
    .doc(this.state.id)
    .then(data => {
        localStorage.setItem(AppString.NUMBER, this.state.phoneNumber)
  
  
        this.setState({isLoading: false})
    })
  }

  render() {
   
    return (
      <>
      <div className="section section-typo">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      
        <Container  className="text-center mx-auto d-block" >
        <div style={{display:this.state.displayPhone }}>
        <Row>
            <Col>
            <div className="space-100"/>
            <p  style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600",textTransform:"uppercase" }}>saisir votre numéro de téléphone <span>
            <Button
            className="btn-round"
                  color="#757575"
                  style={{backgroundImage: "#757575"}}
                  data-container="body"
                  data-content="Here will be some very useful information about his popover."
                  data-placement="top"
                  id="tooltip657685043"
                  size="sm"
                  type="button"
                >
                <i className="fas fa-info"></i>
                </Button>
                <UncontrolledPopover placement="top" target="tooltip657685043">
                <PopoverHeader>Politique: Votre numéro!</PopoverHeader>
                <PopoverBody>
                  Vous pouvez également utiliser des noms aléatoire pour garentire votre désire de rester annonyme si vous voulez.
                </PopoverBody>
              </UncontrolledPopover>
            </span></p>
              </Col>
             </Row>

             <Row>
             <Col  className="text-center mx-auto d-block" lg="3" sm="6">
                <InputGroup
                  className={classnames({
                    "input-group-focus": this.state.inputFocus
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <p style={{lineHeight:"10px",marginBottom:"-2px",marginTop:"2px"}}>+212</p>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  className="no-spinner"
                  style={{WebkitAppearance:"none" ,marker:"0"}}
                    placeholder="611223344"
                    type="text"
                    onFocus={e => this.setState({ inputFocus: true })}
                    onBlur={e => this.setState({ inputFocus: false })}
                    onChange={this.onChangePhoneNumber}
                  />
                </InputGroup>
                
              </Col>
          </Row>
          <Row>
          <Col>
                  <div>
                  
                  </div>
          </Col>
          </Row>
          <Row>
          <Col className="text-center mx-auto d-block" lg="8" md="12">

        <h5 className="description" style={{marginTop:"45px"}} >
          Appuyez sur "Envoyé" et on vous enverra   un message avec un code de vérification. Vous pourrez ensuite utiliser ce numérode téléphone vérifié pour  vous connecter        </h5>

          </Col>
        </Row>

        <Row>
        <Col>
        
      
     <div>

     
              <Button  
              id="sign-in-button"
              onClick={this.onSignInSubmit}
              className=" btn-round mx-auto d-block"  
              style={{textTransform:"uppercase", fontWeight:"600",backgroundColor: "#3f51b5",borderRadius:"50px",backgroundImage: "linear-gradient(to bottom right, #3f51b5, #9c27b0)"}} >
              
              Envoyé <i style={{fontSize:"17px",marginLeft:"15px", marginRight:"-25px",marginTop:"-5px"}} className="fas fa-paper-plane"></i></Button>
              
</div>
        </Col>
      </Row>
      </div>
    </Container>
      


    <Container  className="text-center mx-auto d-block" >
    <div style={{display:this.state.displayCode}}>
        <Row>
            <Col>
            <div className="space-100"/>
            <p  style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600",textTransform:"uppercase" }}>mon code c'est </p><span>
            <h5>{this.state.phoneNumber}</h5>

            </span>
              </Col>
             </Row>

             <Row>
             <Col  className="text-center mx-auto d-block" lg="3" sm="6">
                <InputGroup
                 
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i style={{lineHeight:"10px",marginBottom:"-2px",marginTop:"2px"}} className="fas fa-shield-alt"></i>
                     
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  className="no-spinner"
                  style={{WebkitAppearance:"none" ,marker:"0"}}
                    placeholder="611223344"
                    type="text"
                    onFocus={e => this.setState({ inputFocus: true })}
                    onBlur={e => this.setState({ inputFocus: false })}
                    onChange={this.onChangeCodeVerify}
                  />
                </InputGroup>
                
              </Col>
          </Row>
          <Row>
          <Col>
                  <div>
                  
                  </div>
          </Col>
          </Row>
          <Row>
          <Col className="text-center mx-auto d-block" lg="8" md="12">

        <h5 className="description" style={{marginTop:"45px"}} >
         TAPEZ </h5>

          </Col>
        </Row>

        <Row>
        <Col>
        
      
     <div>

     
              <Button  
              id="sign-in-button"
              onClick={this.onCodeVerify}
              className=" btn-round mx-auto d-block"  
              style={{textTransform:"uppercase", fontWeight:"600",backgroundColor: "#3f51b5",borderRadius:"50px",backgroundImage: "linear-gradient(to bottom right, #3f51b5, #9c27b0)"}} >
              
              Validé <i style={{fontSize:"17px",marginLeft:"15px", marginRight:"-25px",marginTop:"-5px"}} className="fas fa-paper-plane"></i></Button>
              
</div>
        </Col>
      </Row>
      </div>
    </Container>
      
    </div>
    
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
  </>
    );
  }
}

export default withRouter(PhoneSigninContent);
