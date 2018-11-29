import ActionTypes, { Actions } from "./reducers/actions";
import { toastr } from 'react-redux-toastr'

const workerManager = {};

function processReceiveMessage(store, messageInfo) {
    const msg = messageInfo.msg;
    const fromUser = messageInfo.fromUser;
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
            const { userId, nickname } = fromUser;
            console.log('user', nickname, 'request to listen with');
            toastr.confirm(`${nickname} request to listen with you`, {
                onOk: () => store.dispatch({ type: ActionTypes.approveListenWithRequest, id: userId }),
                onCancel: () => store.dispatch({ type: ActionTypes.rejectListenWithRequest, userId })
            });
            break;
        }
        case 'approval': {
            const { userId, nickname } = fromUser;
            console.log('user', nickname, 'has approval your request to listen with');
            store.dispatch({ type: ActionTypes.approvaledListenWith, id: userId });
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