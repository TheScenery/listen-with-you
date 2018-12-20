const ActionTypes = {
    playSong: 'playSong',
    nextSong: 'nextSong',
    receivePlayList: 'receivePlayList',
    initLoad: 'initLoad',
    loadPlayList: 'loadPlayList',
    receivePlayListDetail: 'receivePlayListDetail',
    requestToListenWith: 'requestToListenWith',
    forgetListenWith: 'forgetListenWith',
    startListenAllUserMsgs: 'startListenAllUserMsgs',
    approveListenWithRequest: 'approveListenWithRequest',
    rejectListenWithRequest: 'rejectListenWithRequest',
    approvaledListenWith: 'approvaledListenWith',
    activeSongs: 'activeSongs',
};

export const Actions = {
    nextSong: () => ({ type: ActionTypes.nextSong }),
    playSong: (id) => ({ type: ActionTypes.playSong, id }),
    initLoad: () => ({ type: ActionTypes.initLoad }),
    loadPlayList: (id) => ({ type: ActionTypes.loadPlayList, id }),
    requestToListenWith: (id) => ({ type: ActionTypes.requestToListenWith, id }),
    forgetListenWith: () => ({ type: ActionTypes.forgetListenWith }),
    startListenAllUserMsgs: (id) => ({ type: ActionTypes.startListenAllUserMsgs, id }),
    activeSongs: (songs) => ({type: ActionTypes.activeSongs, songs}),
}

export default ActionTypes;