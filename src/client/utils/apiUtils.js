import { sendRequest } from "./requestUtils";
import { getLoginStatus } from "./authUtils";

export function getRecommendSongs(success, error) {
    sendRequest('/api/recommend/songs').then((res) => {
        const data = res.data;
        success && success(data.recommend)
    }).catch((err) => {
        console.log(err);
        error && error(err);
    })
}

export function getPlayList(success, error) {
    getLoginStatus((data) => {
        const userInfo = data.profile;
        if (userInfo.userId) {
            sendRequest('/api/user/playlist', { uid: userInfo.userId }).then((res) => {
                const data = res.data;
                success && success(data.playlist)
            }).catch((err) => {
                console.log(err);
                error && error(err);
            })
        }
    })
}

export function getPlayListDetail(id, success, error) {
    sendRequest('/api/playlist/detail', { id }).then((res) => {
        const data = res.data;
        success && success(data.playlist)
    }).catch((err) => {
        console.log(err);
        error && error(err);
    })
}

export function getSongInfo(id, success, error) {
    sendRequest('/api/song/url', { id }).then((res) => {
        const data = res.data;
        success && success(data.data)
    }).catch((err) => {
        error && error(err);
    })
}

export function getLatestMessage(userId, success, error) {
    sendRequest('/api/msg/private/history', { userId, limit: 1 }).then((res) => {
        const data = res.data;
        success && success(data.msgs)
    }).catch((err) => {
        error && error(err);
    })
}

export function getFollows(userId) {
    return new Promise((resolve, reject) => {
        sendRequest('/api/user/follows', { uid: userId }).then((res) => {
            resolve(res.data.follow)
        }).catch((err) => reject(err))
    })
}

export function senRequestToListenWith(userId) {
    return new Promise((resolve, reject) => {
        sendRequest('/api/send/text', { user_ids: userId, msg: `requestToListenWith` }).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}

export function sendApproval(userId) {
    return new Promise((resolve, reject) => {
        sendRequest('/api/send/text', { user_ids: userId, msg: `approve` }).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}

export function getAllUserMsgs(uid) {
    return new Promise((resolve, reject) => {
        sendRequest('/api/msg/private/users', { uid }).then((res) => {
            resolve(res.data.msgs);
        }).catch((err) => reject(err));
    })
}
