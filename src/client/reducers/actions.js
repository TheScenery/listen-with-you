const ActionTypes = {
    playSong: 'playSong',
    nextSong: 'nextSong',
    receivePlayList: 'receivePlayList',
    initLoad: 'initLoad',
    loadPlayList: 'loadPlayList',
    receivePlayListDetail: 'receivePlayListDetail',
};

export const Actions = {
    nextSong: () => ({ type: ActionTypes.nextSong }),
    playSong: (id) => ({ type: ActionTypes.playSong, id }),
    initLoad: () => ({ type: ActionTypes.initLoad }),
    loadPlayList: (id) => ({ type: ActionTypes.loadPlayList, id }),
}

export default ActionTypes;