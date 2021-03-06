import { sendRequest } from "./requestUtils";
import _ from 'lodash';

const userInfo = {
    loginType: null,
    loginID: null,
    password: null,
}

export function getUserInfo() {
    return userInfo;
}

export function getLoginStatus(success, error) {
    sendRequest('/api/login/status').then((res) => {
        _.merge(userInfo, res.data.profile);
        success && success(res.data);
    }).catch((err) => {
        error && error(err);
    })
}

export function authenticate(success, error) {
    sendRequest(`/api/login${userInfo.loginType === 'phone' ? '/cellphone' : ''}`, { phone: userInfo.loginID, password: userInfo.password }).then((res) => {
        if (res && res.status === 200) {
            const data = res.data;
            userInfo.id = data.account.id;
            success && success(res);
        }
    }).catch((err) => {
        error && error(err);
    })
}

export function signIn(loginType, user, password, success, error) {
    userInfo.loginType = loginType;
    userInfo.loginID = user;
    userInfo.password = password;
    authenticate(success, error)
}

export function signOut(cb) {
    currentUserInfo = null;
}