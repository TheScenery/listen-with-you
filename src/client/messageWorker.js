import { getLatestMessage } from "./utils/apiUtils";

setInterval(()=> getLatestMessage('userID', (res) => {
    self.postMessage(res);
}), 1000)

self.onmessage = (e) => {
    console.log(e);
}