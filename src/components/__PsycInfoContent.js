
import React from "react";
// reactstrap components

import {
  Button,
  FormGroup,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Container,
  Row,
  Col
} from "reactstrap";
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

        policyCheck: localStorage.getItem(AppString.POLICY_CHECK),
        firstQuestion:"Veulliez choisr votre réponse",
        secondQuestion:"Veulliez choisr votre réponse",
        thirdQuestion:"Veulliez choisr votre réponse",
        expressSection:"Veulliez choisr votre réponse"

            }
}

componentDidMount() {
  this.checkPolicy()
}

checkPolicy = async () => {
/* if (!localStorage.getItem(AppString.POLICY_CHECK)) {
  this.setState({isLoading: false}, () => {
      this.props.history.push('/policy')
  })
}*/
}

onChangeFirstQuestion = event => {
this.setState({firstQuestion: event.target.value})
}
onChangeSecondQuestion = event => {
  this.setState({secondQuestion: event.target.value})
  }
onChangeThirdQuestion = event => {
    this.setState({thirdQuestion: event.target.value})
    }

onChangeExpressSection = event => {
    this.setState({expressSection: event.target.value})
      }



setUserInfo = () => {
let newInfo

  newInfo = {
      firstQuestion: this.state.firstQuestion,
      secondQuestion: this.state.secondQuestion,
      thirdQuestion: this.state.thirdQuestion,
      expressSection: this.state.expressSection


      }
myFirestore
  .collection(AppString.NODE_USERS)
  .doc(this.state.id)
  .update(newInfo)
  .then(data => {
      localStorage.setItem(AppString.FIRST_QUESTION, this.state.firstQuestion)
      localStorage.setItem(AppString.SECOND_QUESTION, this.state.secondQuestion)
      localStorage.setItem(AppString.THIRD_QUESTION, this.state.thirdQuestion)
      localStorage.setItem(AppString.EXPRESS_SECTION, this.state.expressSection)

      this.setState({isLoading: false})
  })
}



onNextClick = () => {
  this.setUserInfo()
  this.props.history.push('/main')
}


  render() {
    return (
      <>
      <div className="section section-typo">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />

        <Container>
        <Row >
        <Col  >
        <FormGroup style={{ marginLeft:'12%' }}>
        <div className="space-120"/>
        <div  style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" }}>QUESTION 1 <span>
       <UncontrolledDropdown >
        <DropdownToggle
          caret
          color="neutral"
          data-toggle="dropdown"

        >

          {this.state.firstQuestion}
        </DropdownToggle>
        <DropdownMenu className="dropdown-with-icons">
          <DropdownItem
          value="Reponse 1"
          onClick={this.onChangeFirstQuestion}
          >
            <i className="tim-icons icon-double-right" />
            Réponse 1
          </DropdownItem>
          <DropdownItem
          value="Reponse 2"
          onClick={this.onChangeFirstQuestion} >
          <i className="tim-icons icon-double-right" />
          Réponse 2
          </DropdownItem>

          <DropdownItem
          value="Reponse 3"
          onClick={this.onChangeFirstQuestion}
          >
          <i className="tim-icons icon-double-right" />
          Réponse 3
          </DropdownItem>
          <DropdownItem
          value="Reponse 4"
          onClick={this.onChangeFirstQuestion} >
          <i className="tim-icons icon-double-right" />
          Réponse 4
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
        </span></div>

        </FormGroup>

        </Col>
      </Row>

      <Row >
      <Col >
      <FormGroup style={{ marginLeft:'12%' }}>
      <div  style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" }}>QUESTION 2 <span>
     <UncontrolledDropdown >
      <DropdownToggle
        caret
        color="neutral"
        data-toggle="dropdown"

      >

        {this.state.secondQuestion}
      </DropdownToggle>
      <DropdownMenu className="dropdown-with-icons">
        <DropdownItem
        value="Reponse 1"
        onClick={this.onChangeSecondQuestion}
        >
          <i className="tim-icons icon-double-right" />
          Réponse 1
        </DropdownItem>
        <DropdownItem
        value="Reponse 2"
        onClick={this.onChangeSecondQuestion} >
        <i className="tim-icons icon-double-right" />
        Réponse 2
        </DropdownItem>

        <DropdownItem
        value="Reponse 3"
        onClick={this.onChangeSecondQuestion}
        >
        <i className="tim-icons icon-double-right" />
        Réponse 3
        </DropdownItem>
        <DropdownItem
        value="Reponse 4"
        onClick={this.onChangeSecondQuestion} >
        <i className="tim-icons icon-double-right" />
        Réponse 4
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
      </span></div>

      </FormGroup>

      </Col>
    </Row>

    <Row >
    <Col  >
    <FormGroup style={{ marginLeft:'12%' }}>
    <div  style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" }}>QUESTION 3 <span>
   <UncontrolledDropdown >
    <DropdownToggle
      caret
      color="neutral"
      data-toggle="dropdown"

    >

      {this.state.thirdQuestion}
    </DropdownToggle>
    <DropdownMenu className="dropdown-with-icons">
      <DropdownItem
      value="Reponse 1"
      onClick={this.onChangeThirdQuestion}
      >
        <i className="tim-icons icon-double-right" />
        Réponse 1
      </DropdownItem>
      <DropdownItem
      value="Reponse 2"
      onClick={this.onChangeThirdQuestion} >
      <i className="tim-icons icon-double-right" />
      Réponse 2
      </DropdownItem>

      <DropdownItem
      value="Reponse 3"
      onClick={this.onChangeThirdQuestion}
      >
      <i className="tim-icons icon-double-right" />
      Réponse 3
      </DropdownItem>
      <DropdownItem
      value="Reponse 4"
      onClick={this.onChangeThirdQuestion} >
      <i className="tim-icons icon-double-right" />
      Réponse 4
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
    </span></div>

    </FormGroup>

    </Col>
  </Row>

  <Row >
    <Col  >
    <FormGroup style={{ marginLeft:'12%' }}>
    <p  style={{ color:"hsla(0,0%,100%,.8)", fontSize:"24px",fontWeight:"600" }}>EXPRIMER LIBREMENT </p>
    <Input
            style={{ borderRadius:"9px", paddingBottom:"50px" ,fontSize:"18px", fontWeight:"500",width:"86%" }} defaultValue="" placeholder="je sens..." type="text"
            
            onChange={this.onChangeExpressSection}
            />
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
