import { getLatestMessage, getAllUserMsgs } from "./utils/apiUtils";

// setInterval(() => getLatestMessage('userID', (res) => {
//     self.postMessage(res);
// }), 1000);

self.startGetUserMsgs = (uid) => {
    let lastNewMsg = '';
    self.getUserMsgsInterval = setInterval(() => getAllUserMsgs(uid).then((msgs) => {
        const newMessageUser = msgs.find(msg => msg.newMsgCount > 0 && new Date() - new Date(msg.lastMsgTime) < 3000);
        if (newMessageUser) {
            const fromUser = newMessageUser.fromUser;
            const lastMsg = JSON.parse(newMessageUser.lastMsg);
            const msg = lastMsg.msg;
            if (msg !== lastNewMsg) {
                lastNewMsg = msg;
                self.postMessage({ fromUser, msg });
            }
        }
    }).catch(err => console.log(err)), 3000);
}

self.stopGetUserMsgs = () => {
    clearInterval(self.getUserMsgsInterval);
}

self.startListen = (uid) => {
    let lastNewMsg = '';
    self.startListenInterval = setInterval(() => getLatestMessage(uid).then((msg) => {
        console.log(msg);
    }).catch(err => console.log(err)), 1000)
}

self.onmessage = (e) => {
    const data = e.data;
    switch (data.action) {
        case 'startGetUserMsgs':
            self.startGetUserMsgs(data.userId);
            break;
        case 'stopGetUserMsgs':
            self.stopGetUserMsgs();
            break;
        case 'startListen':
            self.startListen();
            break;
        default:
            break;
    }
}