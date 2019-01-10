import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { GoogleLogout } from 'react-google-login';

export default class AppMenu extends Component {
    state = { activeItem: 'endpoints' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu vertical>
                <Menu.Item name='endpoints'
                    active={activeItem === 'endpoints'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item name='settings'
                    active={activeItem === 'settings'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item>
                    <GoogleLogout
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout}
                    />
                </Menu.Item>
            </Menu>
        )
    }
}
