import _ from 'lodash';
import Actions from './actions'

const { playSong, nextSong, receivePlayList, loadPlayList, receivePlayListDetail, requestToListenWith,
    forgetListenWith, approveListenWithRequest, approvaledListenWith } = Actions;

export function player(state = { activeSongId: null, activeSongList: [] }, action) {
    const type = action.type;
    switch (type) {
        case playSong:
            return { ...state, activeSongId: action.id }
        case nextSong: {
            const activeSongId = state.activeSongId;
            const activeSongList = state.activeSongList;
            const activeIndex = activeSongList.findIndex(s => s.id === activeSongId);
            return { ...state, activeSongId: _.get(activeSongList[activeIndex + 1], 'id') }
        }
        default:
            return state
    }
}

export function mainPanel(state = { songList: [], lists: [] }, action) {
    const type = action.type;
    switch (type) {
        case receivePlayList:
            return { ...state, playList: action.playList }
        case loadPlayList:
            return { ...state, activePlayList: action.id }
        case receivePlayListDetail:
            return { ...state, playListDetail: action.playListDetail }
        default:
            return state
    }
}

export function listenWithInfo(state = {}, action) {
    const type = action.type;
    switch (type) {
        case requestToListenWith:
            return { ...state, listenWithId: action.id, status: 'pendingApproval' }
        case forgetListenWith: {
            return {}
        }
        case approveListenWithRequest:
            return { ...state, sharedWithId: action.id }
        case approvaledListenWith:
            if (action.id === state.listenWithId) {
                return { ...state, status: 'listening' };
            }
            return state;
        default:
            return state;
    }
}