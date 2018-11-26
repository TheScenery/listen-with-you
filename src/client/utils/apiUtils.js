import { sendRequest } from "./requestUtils";
import { getUserInfo, getLoginStatus } from "./authUtils";
import { resolve } from "url";

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