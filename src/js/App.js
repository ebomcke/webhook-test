import React, { Component } from 'react'
import LoginView from './components/LoginView'
import Dashboard from './components/Dashboard'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: true };
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleLoginSuccess(response) {
        this.setState({
            isLoggedIn: true
        });
    }

    handleLoginFailure(error) {
        this.setState({
            isLoggedIn: false
        });
    }

    logout() {
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Dashboard handleLogout={this.logout} />
        }
        return <LoginView handleLoginSuccess={this.handleLoginSuccess} handleLoginFailure={this.handleLoginFailure} />
    }
}

export default App