import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "../views/Home";
import Main from "../views/Main";
import Profile from "../views/Profile";
import Policy from 'views/Policy';
import BasicInfoForm from 'views/BasicInfoForm';
import {toast, ToastContainer} from 'react-toastify'






class Root extends Component {
   
    showToast = (type, message) => {
        // 0 = warning, 1 = success
        switch (type) {
            case 0:
                toast.warning(message)
                break
            case 1:
                toast.success(message)
                break
            default:
                break
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                <ToastContainer
                autoClose={2000}
                hideProgressBar={true}
                position={toast.POSITION.BOTTOM_RIGHT}
            />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => <Home showToast={this.showToast} {...props} />}
                        />
                        <Route
                        exact
                        path="/policy"
                        render={props => <Policy showToast={this.showToast} {...props} />}
                    />
                    <Route
                        exact
                        path="/info"
                        render={props => <BasicInfoForm  showToast={this.showToast} {...props} />}
                    />
                        <Route
                        exact
                        path="/main"
                        render={props => <Main showToast={this.showToast} {...props} />}
                    />
                    <Route
                        exact
                        path="/profile"
                        render={props => <Profile showToast={this.showToast} {...props} />}
                    />
				<Redirect  to="/" />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default  Root;