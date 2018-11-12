import React, { Component } from 'react';
import './Login.scss';

export default class Login extends Component {
    constructor(props) {
        super(props);
        const self = this;
        self.state = {
            loginType: null,
        }
        this.showLoginInput = this.showLoginInput.bind(this);
    }

    showLoginInput(loginType) {
        this.setState({ loginType })
    }

    render() {
        const self = this;
        const { loginType } = self.state;
        return (
            <div className="login-container">
                <div className="button" onClick={() => self.showLoginInput('phone')}>用手机号登录</div>
                <div className="button" onClick={() => self.showLoginInput('email')}> 使用邮箱登录</div>
                {loginType === "phone" && (
                    <div>
                        <input type="text"></input>
                        <input type="password"></input>
                    </div>
                )}
                {loginType === "email" && (
                    <div>
                        <input type="text"></input>
                        <input type="password"></input>
                    </div>
                )}
            </div>
        )
    }
}