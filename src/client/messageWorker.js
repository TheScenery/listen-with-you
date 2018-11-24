import { getLatestMessage } from "./utils/apiUtils";

setInterval(()=> getLatestMessage('', (res) => {
    console.log(res);
}), 1000)

self.onmessage = (e) => {
    console.log(e);
}