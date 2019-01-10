import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import moment from 'moment';

export default class EndpointList extends Component {
    formatLastActive(date) {
        const now = moment();
        const seconds = now.diff(date, 'second');
        if (seconds < 60) {
            return ` ${seconds} seconds ago`;
        }
        const minutes = now.diff(date, 'minute');
        if (minutes < 60) {
            return ` ${minutes} minutes ago`;
        }
        if (now.isSame(date, 'day')) {
            return ` at ${moment(date).format('HH:mm')}`;
        }
        return `: ${moment(date).format('YYYY-MM-DD HH:mm')}`;
    }

    render() {
        const endpoints = this.props.endpoints.map(endpoint =>
            <List.Item>
                <List.Content>
                    <List.Header as='a'>{endpoint.path}</List.Header>
                    <List.Description>Last active{this.formatLastActive(endpoint.lastActive)}</List.Description>
                </List.Content>
            </List.Item>
        )
        return <List selection>
            { endpoints }
        </List>
    }
}