import React from "react";
import {withRouter} from 'react-router-dom'

import 'assets/css/Main.css'
import CancelNavbar from "../components/Navbars/CancelNavbar"

import PolicyContent from "components/__PolicyContent"
import {AppString} from '../assets/data/Const'
import { myFirestore} from  '../conf/MyFirebase'





class Policy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading: false,
        policyCheck: localStorage.getItem(AppString.POLICY_CHECK),
        id: localStorage.getItem(AppString.ID)
            }
}

componentDidMount() {
  this.checkPolicy()
}

checkPolicy = async () => {
  console.log(localStorage.getItem(AppString.POLICY_CHECK))
}

onNextClick = () => {
  let newInfo
  newInfo = {
    policyCheck: true
}
  myFirestore
        .collection(AppString.NODE_USERS)
        .doc(this.state.id)
        .update(newInfo)
        .then(data => {
            localStorage.setItem(AppString.POLICY_CHECK, this.state.policyCheck)
            this.setState({isLoading: false})
            //this.props.showToast(1, 'Update info success')
        })
  this.props.history.push('/basicInfo')
}


  render() {

      return (
        <>

        <CancelNavbar />
     <PolicyContent></PolicyContent>
     </>
      );
    }
  }
  export default withRouter(Policy);
