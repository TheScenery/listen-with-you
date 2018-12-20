import { connect } from 'react-redux';
import MainPanel from '../component/MainPanel';
import { Actions } from '../reducers/actions'

const mapStateToProps = (state) => ({
    mainPanel: state.mainPanel,
})

const mapDispatchToProps = {
    playSong: Actions.playSong,
    initLoad: Actions.initLoad,
    loadPlayList: Actions.loadPlayList,
    startListenAllUserMsgs: Actions.startListenAllUserMsgs,
    activeSongs: Actions.activeSongs,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel)