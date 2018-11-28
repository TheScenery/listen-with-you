import { Actions } from "./reducers/actions";

const workerManager = {};

function processReceiveMessage(store, msg) {
    console.log(msg);
    const actions = msg.split('&');
    const action = actions[0];
    switch (action) {
        case 'play': {
            const songInfo = actions[1].split('=');
            const songId = songInfo[1];
            console.log('play song', songId);
            store.dispatch(Actions.playSong(songId))
            break;
        }
        case 'requestToListenWith': {
            const userInfo = actions[1].split('=');
            console.log(userInfo);
            const userId = userInfo[1];
            console.log('user', userId, 'request to listen with');
            break;
        }
    }
}


export function initMessageHandler(store, worker) {
    workerManager.worker = worker;
    worker.onmessage = (event) => {
        processReceiveMessage(store, event.data);
    }
}

export function sendMessageToWorker(msg) {
    const worker = workerManager.worker;
    if (worker) {
        worker.postMessage(msg);
    }
}