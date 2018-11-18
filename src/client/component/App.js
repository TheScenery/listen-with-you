import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainPanel from './MainPanel';
import Login from './Login'
import { Route, withRouter } from 'react-router-dom';
import './App.scss';
import { getLoginStatus } from '../utils/authUtils';

class App extends Component {
    static propTypes = {
        history: PropTypes.object,
    }

    componentWillMount() {
        const history = this.props.history;
        getLoginStatus(() => history.replace('/main'), () => history.replace('login'));
    }

    render() {
        return (
            <div className="app-container">
                <div className="main-container">
                    <Route path="/main" component={MainPanel} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        );
    }
}

export default withRouter(App);