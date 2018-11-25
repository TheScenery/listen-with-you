import { Actions } from "./reducers/actions";

function processReceiveMessage(store, data) {
    const message = data[0];
    const time = message.time;
    const msgInfo = JSON.parse(message.msg);
    const msg = msgInfo.msg;
    // 1000 ms 有效性
    if (new Date() - new Date(time) > 1000) {
        return;
    }
    const actions = msg.split('&');
    const action = actions[0];
    console.log(msgInfo.msg);
    switch (action) {
        case 'play': {
            const songInfo = actions[1].split('=');
            const songId = songInfo[1];
            console.log(songId)
            store.dispatch(Actions.playSong(songId))
        }
    }
}

export function initMessageHandler(store, worker) {
    worker.onmessage = (event) => {
        processReceiveMessage(store, event.data);
    }
}