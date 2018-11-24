import _ from 'lodash';
import Actions from './actions'

const { playSong, nextSong, receiveSongList } = Actions;

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
        case receiveSongList:
            return { ...state, songList: action.songList }
        default:
            return state
    }
}