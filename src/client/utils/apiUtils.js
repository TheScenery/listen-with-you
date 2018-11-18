import { sendRequest } from "./requestUtils";

export function getRecommendSongs(success, error) {
    sendRequest('/api/recommend/songs').then((res) => {
        const data = res.data;
        success && success(data.recommend)
    }).catch((err) => {
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