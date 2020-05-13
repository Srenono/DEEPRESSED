
import React from "react";
// reactstrap components

import {
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Container,
  Row,
  Col
} from "reactstrap";
import ReactDatetime from "react-datetime";
import { myFirestore} from  '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import {withRouter} from 'react-router-dom'
import ReactLoading from 'react-loading'


class BasicInfoForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        isLoading: false,
        id: localStorage.getItem(AppString.ID),
        check: localStorage.getItem(AppString.CHECK),
        fullName: localStorage.getItem(AppString.FULLNAME),
        dateOfBirth: localStorage.getItem(AppString.DATE_OF_BIRTH),
        sexe: localStorage.getItem(AppString.SEXE)
            }
}

componentDidMount() {
  this.checkPolicy()
}

checkPolicy =  () => {
  if (localStorage.getItem(AppString.CHECK) === "undefined") {
    console.log(this.state)
  } else{ 
    console.log(this.state)
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
  this.props.history.push('/psycInfo')
}


  render() {
    return (
      <>
      <div className="section section-typo">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      
        <Container>
        <Row>
            <Col>
            <FormGroup>
            <div className="space-120"/>
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
                <i className="fas fa-info"></i>
                </Button>
                <UncontrolledPopover placement="top" target="tooltip657685043">
                <PopoverHeader>Politique: Annonyme!</PopoverHeader>
                <PopoverBody>
                  Vous pouvez également utiliser des noms aléatoire pour garentire votre désire de rester annonyme si vous voulez.
                </PopoverBody>
              </UncontrolledPopover>
            </span></p>
            <Input
            style={{ borderRadius:"25px", fontSize:"18px", fontWeight:"500", }}  placeholder="Will SMITH" type="text"
            value={this.state.fullName ? this.state.fullName : ''}
            onChange={this.onChangeFullName}
            />
            </FormGroup>

            </Col>
          </Row>
          <Row>
          <Col>
          <p style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" ,marginTop:"10px"}}>DATE DE NAISSANCE</p>

            <FormGroup  >
              <ReactDatetime 
              closeOnSelect={true}
              timeFormat={false}
              className=" form-rounded"
              onChange={moment => this.onChangeDateOfBirth(moment, 'dateOfBirth')}
                  inputProps={{
                  placeholder: "MM/JJ/AAAA",
                  disabled:false,
                }}
                value={this.state.dateOfBirth}
              />
            </FormGroup>

          </Col>
        </Row>

          <Row>
          <Col>
          <p style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" ,marginTop:"10px"}}>Genre</p>
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
        style={{marginTop:"10px",marginBottom:"52px", backgroundImage: "linear-gradient(to bottom right, #3f51b5, #9c27b0)"}} onClick={this.onNextClick}
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

export default withRouter(BasicInfoForm);
