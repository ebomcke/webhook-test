import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import './LoginView.css'

class LoginView extends Component {
    render() {
        return <div className="login-background">
            <div className="login-button-container">
                <GoogleLogin
                    clientId="388313404216-0ntofrmp6pg4ps46290kroj6avbdu5m2.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.props.handleLoginSuccess}
                    onFailure={this.props.handleLoginFailure}
                />
            </div>
        </div>
    }
}

export default LoginView