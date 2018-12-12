import ActionTypes from "./reducers/actions";
import {
    getRecommendSongs,
    getPlayList,
    getPlayListDetail,
    senRequestToListenWith,
    sendApproval,
    sendPlaySong
} from "./utils/apiUtils";
import {
    sendMessageToWorker
} from "./workerHandler";

export const logger = ({
    getState
}) => next => action => {
    console.log('logger: dispatch action', action);
    const returnValue = next(action);
    console.log('logger: state', getState());
    return returnValue;
}

export const request = ({
    getState,
    dispatch
}) => next => action => {
    switch (action.type) {
        case ActionTypes.initLoad:
            getPlayList((playList) => {
                dispatch({
                    type: ActionTypes.receivePlayList,
                    playList
                })
            });
            break;
        case ActionTypes.loadPlayList:
            if (action.id === 'recommend') {
                getRecommendSongs((songs) => {
                    dispatch({
                        type: ActionTypes.receivePlayListDetail,
                        playListDetail: {
                            tracks: songs
                        }
                    })
                })
            } else {
                getPlayListDetail(action.id, (listDetail) => {
                    dispatch({
                        type: ActionTypes.receivePlayListDetail,
                        playListDetail: listDetail
                    })
                });
            }
            break;
        case ActionTypes.requestToListenWith:
            senRequestToListenWith(action.id).then((res) => {
                console.log(res);
            }).catch((err) => console.log(err));
            break;
        case ActionTypes.startListenAllUserMsgs:
            sendMessageToWorker({
                action: 'startGetUserMsgs',
                userId: action.id
            })
            break;
        case ActionTypes.approveListenWithRequest:
            {
                sendApproval(action.id);
                sendMessageToWorker({
                    action: 'stopGetUserMsgs'
                })
                break;
            }
        case ActionTypes.approvaledListenWith:
            sendMessageToWorker({
                action: 'stopGetUserMsgs'
            })
            sendMessageToWorker({
                action: 'startListen',
                userId: action.id
            })
            break;
        case ActionTypes.playSong:
            {
                const state = getState();
                const shareWithId = state.listenWithInfo.sharedWithId;
                if (shareWithId) {
                    sendPlaySong(shareWithId, action.id)
                }
                break;
            }
        default:
            break;
    }
    return next(action);
}

export default request;