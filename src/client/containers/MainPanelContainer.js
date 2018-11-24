import { connect } from 'react-redux';
import MainPanel from '../component/MainPanel';
import { Actions } from '../reducers/actions'

const mapStateToProps = (state) => ({
    mainPanel: state.mainPanel,
})

const mapDispatchToProps = {
    playSong: Actions.playSong,
    initLoad: Actions.initLoad,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel)