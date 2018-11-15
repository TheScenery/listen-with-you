import axios from 'axios';

export function sendRequest(path, args) {
    return axios.post(path, args)
}