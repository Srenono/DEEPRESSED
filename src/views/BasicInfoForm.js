import React from "react";
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import {myFirebase, myFirestore, myStorage} from '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import logout from '../assets/img/ic_logout.png'
import 'assets/css/Main.css'
import LogoBig from "assets/img/LogoBig.svg";
import CancelNavbar from "../components/Navbars/CancelNavbar"
import Switch from "react-bootstrap-switch";
import classnames from "classnames";
import ReactDatetime from "react-datetime";


import {
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  InputGroupText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";


class BasicInfoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            id: localStorage.getItem(AppString.ID),
            policyCheck: localStorage.getItem(AppString.POLICY_CHECK),
            fullName: localStorage.getItem(AppString.FULLNAME),
            dateOfBirth: localStorage.getItem(AppString.DATE_OF_BIRTH),
            sexe: localStorage.getItem(AppString.SEXE)
                }
    }

    componentDidMount() {
      this.checkPolicy()
  }
  
   checkPolicy = async () => {
    if (!localStorage.getItem(AppString.POLICY_CHECK)) {
      this.setState({isLoading: false}, () => {
          this.props.history.push('/policy')
      })
  }
}

onChangeFullName = event => {
  this.setState({fullName: event.target.value})
}


onChangeDateOfBirth = (moment, dateOfBirth) => this.setState({ [dateOfBirth]: moment.toDate() });


onChangeSexe = event => {
  this.setState({sexe: event.target.value})
}


setUserInfo = () => {
  let newInfo
 
      newInfo = {
          fullName: this.state.fullName,
          dateOfBirth: this.state.dateOfBirth,
          sexe: this.state.sexe,

          }
  myFirestore
      .collection(AppString.NODE_USERS)
      .doc(this.state.id)
      .update(newInfo)
      .then(data => {
          localStorage.setItem(AppString.FULLNAME, this.state.fullName)
          localStorage.setItem(AppString.DATE_OF_BIRTH, this.state.dateOfBirth)
          localStorage.setItem(AppString.SEXE, this.state.sexe)

          this.setState({isLoading: false})
      })
}



    onNextClick = () => {
      this.setUserInfo()
      this.props.history.push('/main')
    }


    render() {
		var sectionStyle = {
		width: "100%",
		height: "100%",
		backgroundColor: '',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		color:'#000000'
		};
      return (
        <>
        <CancelNavbar />
        <div className="wrapper "  style={ sectionStyle }>
        <Container>
        <div  className="section justify-content-md-center " style={{ color:"#757575" }}>
        <div className="space-70" />
        <div  style={{ width:"80%",marginLeft:"10% " ,marginTop:"0px",color:"#757575" }} >
         
            
        <Row>
        <Col >
          <FormGroup>
          <p  style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" }}>NOM COMPLE <span> 
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
              <i class="fas fa-info"></i>
              </Button>
              <UncontrolledPopover placement="top" target="tooltip657685043">
              <PopoverHeader>Politique: Annonyme!</PopoverHeader>
              <PopoverBody>
                Vous pouvez également utiliser des noms aléatoire pour garentire votre désire de rester annonyme si vous voulez.
              </PopoverBody>
            </UncontrolledPopover>
          
          </span></p>
          <Input 
          style={{ borderRadius:"25px", fontSize:"18px", fontWeight:"500", }} defaultValue="" placeholder="Will SMITH" type="text"
          value={this.state.fullName ? this.state.fullName : ''}
          onChange={this.onChangeFullName}
          />
          </FormGroup>
        </Col>
        </Row> 
        <Row>
        <Col >
        <p style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" ,marginTop:"30px"}}>DATE DE NAISSANCE</p>
          <div className="">
            <FormGroup  >
              <ReactDatetime 
              closeOnSelect={true}
              timeFormat={false}
              className=" form-rounded"
              onChange={moment => this.onChangeDateOfBirth(moment, 'dateOfBirth')}
                  inputProps={{
                  borderRadius:"25px",
                  placeholder: "MM/JJ/AAAA",
                  disabled:false,
                  popperPlacement:"bottom-end",
                }}
                value={this.state.dateOfBirth}
              />
            </FormGroup>
            
        <Row >
        <Col lg="3" sm="6">
              <p style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" ,marginTop:"30px"}}>Genre</p>
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    defaultValue="male"
                    id="exampleRadios1"
                    name="exampleRadios"
                    type="radio"
                    checked={this.setState.sexe}
                    onChange={this.onChangeSexe}
                  />
                  <span className="form-check-sign" />
                  Homme
                </Label>
              </FormGroup>
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    defaultChecked
                    defaultValue="female"
                    id="exampleRadios1"
                    name="exampleRadios"
                    type="radio"
                    checked={this.setState.sexe}
                    onChange={this.onChangeSexe}

                  />
                  <span className="form-check-sign" />
                  Femme
                </Label>
              </FormGroup>

            </Col>
        </Row>

          <Row>
          <Col>
        
          <Button
          style={{marginTop:"0", backgroundImage: "linear-gradient(to bottom right, #3f51b5, #9c27b0)"}} onClick={this.onNextClick}
          className=" btn-round mx-auto d-block"
          color=""
          id="tooltip877922017"
          size="lg"
          target="_blank"
        >
        SUIVANT<i style={{fontSize:"24px",marginLeft:"15px", fontWeight:"600", marginRight:"-25px",marginTop:"0px"}}className="tim-icons icon-minimal-right"></i>
          
        </Button>
          </Col>
        </Row>
         
          </div>
        </Col>
      </Row>
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
      </div>

        </Container>
        </div>
       
     </>
      );
    }
  }
  
  export default withRouter(BasicInfoForm);
  