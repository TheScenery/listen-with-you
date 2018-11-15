import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import { signIn } from '../utils/authUtils';

export default class Login extends Component {
    static propTypes = {
        history: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            loginType: null,
            user: '',
            password: '',
        }
        this.showLoginInput = this.showLoginInput.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.login = this.login.bind(this);
    }

    showLoginInput(loginType) {
        this.reset();
        this.setState({ loginType })
    }

    onUserChange(e) {
        this.setState({ user: e.target.value })
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    login() {
        const { user, password } = this.state;
        const { history } = this.props;
        signIn(this.state.loginType, user, password, (res) => {
            console.log(res);
            history.replace('/main');
        }, (error) => {
            console.log(error);
        })
        this.reset();
    }

    reset() {
        this.setState({ loginType: null, user: '', password: '' })
    }

    render() {
        const self = this;
        const { loginType, user, password } = self.state;
        return (
            <div className="login-container">
                {!loginType && <div className="button" onClick={() => self.showLoginInput('phone')}>用手机号登录</div>}
                {!loginType && <div className="button" onClick={() => self.showLoginInput('email')}>使用邮箱登录</div>}
                {loginType &&
                    <div className="input-container">
                        <div className="login-user-info-container">
                            <span className="label">{loginType === "phone" ? "Phone" : "Email"}</span>
                            <input type="text" className="input-box" onChange={self.onUserChange} value={user}></input>
                        </div>
                        <div className="login-user-info-container">
                            <span className="label">Password</span>
                            <input type="password" name="Password" className="input-box" onChange={self.onPasswordChange} value={password}></input>
                        </div>
                        <div className="button-container">
                            <div className="button" onClick={self.login}>登录</div>
                            <div className="button" onClick={() => self.showLoginInput(null)}>返回</div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}