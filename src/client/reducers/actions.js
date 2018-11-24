const ActionTypes = {
    playSong: 'playSong',
    nextSong: 'nextSong',
    receiveSongList: 'receiveSongList',
    initLoad: 'initLoad',
};

export const Actions = {
    nextSong: () => ({ type: ActionTypes.nextSong }),
    playSong: (id) => ({ type: ActionTypes.playSong, id }),
    initLoad: () => ({ type: ActionTypes.initLoad }),
}

export default ActionTypes;