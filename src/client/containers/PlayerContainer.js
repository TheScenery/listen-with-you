import { connect } from 'react-redux';
import Player from '../component/Player';
import { Actions } from '../reducers/actions'

const mapStateToProps = (state) => ({
    player: state.player,
})

const mapDispatchToProps = {
    nextSong: Actions.nextSong,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)