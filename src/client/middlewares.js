import ActionTypes from "./reducers/actions";
import { getRecommendSongs } from "./utils/apiUtils";

export const logger = ({ getState }) => next => action => {
    console.log('logger: dispatch action', action);
    const returnValue = next(action);
    console.log('logger: state', getState());
    return returnValue;
}

export const request = ({ getState, dispatch }) => next => action => {
    switch (action.type) {
        case ActionTypes.initLoad:
            getRecommendSongs((songs) => {
                dispatch({ type: ActionTypes.receiveSongList, songList: songs })
            });
            break;
        default:
            break;
    }
    return next(action);
}

export default request;