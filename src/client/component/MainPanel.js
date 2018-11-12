import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainPanel.scss'
import Login from './Login';

export default class App extends Component {
    render() {
        return (
            <div className="main-panel-container">
                <Login />
            </div>
        )
    }
}