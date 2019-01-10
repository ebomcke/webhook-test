import React, { Component } from 'react'
import AppMenu from './AppMenu'
import Header from './Header'
import EndpointList from './EndpointList'
import './Dashboard.css'

export default class Dashboard extends Component {
    state = {
        endpoints: [{
            path: 'event-type-1',
            amount: 2,
            lastActive: new Date()
        }, {
            path: 'event-type-2',
            amount: 2,
            lastActive: new Date()
        }, {
            path: 'event-type-3',
            amount: 2,
            lastActive: new Date()
        }]
    }

    render() {
        return <div className="dashboard-container">
            <Header />
            <div className="sidebar">
                <AppMenu handleLogout={this.props.handleLogout} endpoints={this.state.endpoints} />
            </div>
            <div className="main-view">
                <EndpointList endpoints={this.state.endpoints} />
            </div>
        </div>
    }
}