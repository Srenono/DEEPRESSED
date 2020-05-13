
import React from "react";
// reactstrap components
import { Container, Row, Col,Button } from "reactstrap";
import Switch from "react-bootstrap-switch";
import { myFirestore} from  '../conf/MyFirebase'
import {AppString} from '../assets/data/Const'
import {withRouter} from 'react-router-dom'
import ReactLoading from 'react-loading'


class PolicyContent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        isLoading: false,
        check: localStorage.getItem(AppString.CHECK),
        id: localStorage.getItem(AppString.ID)
            }
}

componentDidMount() {
  this.checkPolicy()
}

checkPolicy = async () => {
  if (localStorage.getItem(AppString.CHECK === true)) {
    this.setState({isLoading: false}, () => {
        this.props.history.push('/main')
    })
  }
}

onNextClick = () => {
  let newInfo
  newInfo = {
    check: 'true'
}
  myFirestore
        .collection(AppString.NODE_USERS)
        .doc(this.state.id)
        .update(newInfo)
        .then(data => {
            localStorage.setItem(AppString.CHECK, this.state.check)
            this.setState({isLoading: false})
            //this.props.showToast(1, 'Update info success')
        })
  this.props.history.push('/basicInfo')
}



  render() {
    return (
      <>
      <div className="section section-typo">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      
        <Container>
        <Row>
            <Col>
            <img
            alt="..."
            className="mx-auto d-block"
            src={require("assets/img/LOGO_BIG.png")}
            style={{ width: "230px",marginTop:"10px" }}
            
          />
            </Col>
          </Row>
          <h5 className="title text-justify">Bienvenu chez DEEPRESSED, veulliez suivre et acceptez ces régles avant de commancer l'utilisation de notre application. </h5>
          <div id="typography">
          
            <Row>
              <Col md="12">

                <div className="typography-line">
                  <span>Régles 1</span>
                  <p className="text-primary">
                  Veulliez suivre ces régles avant de commancer l'utilisation de notre application
                  </p>
                </div>
                <div className="typography-line">
                  <span>Régles 2</span>
                  <p className="text-info">
                  Veulliez suivre ces régles avant de commancer l'utilisation de notre application
                  </p>
                </div>
                <div className="typography-line">
                  <span>Régles 3</span>
                  <p className="text-warning">
                  Veulliez suivre ces régles avant de commancer l'utilisation de notre application
                  </p>
                </div>

                <Switch  defaultValue={false} offColor="" onColor="" />
              </Col>
            </Row>
            <Row>
            <Col>
          
            <Button
			style={{marginTop:"20px" ,marginBottom:"68px", backgroundImage: "linear-gradient(to bottom right, #3f51b5, #9c27b0)"}} onClick={this.onNextClick}
            className=" btn-round mx-auto d-block"
            color=""
            id="tooltip877922017"
            size="lg"
            target="_blank"
          >
          J'AI COMPRIS <i style={{fontSize:"24px",marginLeft:"15px", fontWeight:"600", marginRight:"-25px",marginTop:"0px"}} className="fas fa-chevron-right"></i>
            
          </Button>
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

export default withRouter(PolicyContent);
