import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onCLickOutside from 'react-onclickoutside';
import './FollowList.scss';
import { getFollows } from '../utils/apiUtils';

class FollowList extends Component {
    static propTypes = {
        userId: PropTypes.number,
        onCLose: PropTypes.func,
        listenWithInfo: PropTypes.object,
        requestToListenWith: PropTypes.func,
        forgetListenWith: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            follows: [],
        }
    }

    handleClickOutside() {
        this.props.onClose();
    }

    componentDidMount() {
        const { userId } = this.props;
        getFollows(userId).then(follows => this.setState({ follows })).catch(error => console.log(error))
    }

    followButtonCLick(id) {
        const { listenWithInfo: { liatenWithId }, requestToListenWith, forgetListenWith } = this.props;
        if (!liatenWithId) {
            requestToListenWith(id);
        } else {
            forgetListenWith();
        }
    }

    getFollowButtonText(id) {
        const { listenWithInfo: { listenWithId, status } } = this.props;
        if (id === listenWithId && status === 'pendingApproval') {
            return '等待同意';
        } else if (id === listenWithId && status === 'listening') {
            return '正在跟随';
        }
        return '跟随她的节奏';
    }

    render() {
        const { style } = this.props;
        const { follows = [] } = this.state;
        return (
            <div className='follow-list-container' style={style}>
                {follows.map((f, index) => (
                    <div key={index} className='follow-user-info'>
                        <img src={f.avatarUrl} alt="avatar" className='avatar'></img>
                        <div className='user-name'>{f.nickname}</div>
                        <div className='follow-button' onClick={() => this.followButtonCLick(f.userId)}>
                            {this.getFollowButtonText(f.userId)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default onCLickOutside(FollowList)