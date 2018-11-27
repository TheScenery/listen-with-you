import { connect } from 'react-redux';
import FollowList from '../component/FollowList';
import { Actions } from '../reducers/actions'

const mapStateToProps = (state) => ({
    listenWithInfo: state.listenWithInfo,
})

const mapDispatchToProps = {
    requestToListenWith: Actions.requestToListenWith,
    forgetListenWith: Actions.forgetListenWith,
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowList)