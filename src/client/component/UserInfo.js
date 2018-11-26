import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Manager, Reference, Popper } from 'react-popper';


import './UserInfo.scss';
import FollowList from './FollowList';

export default class UserInfo extends Component {
    static propsTypes = {
        userInfo: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            showFollowList: false,
        }
    }

    showFollowList(event) {
        const refTargetRect = event.currentTarget.getBoundingClientRect()
        this.setState({ showFollowList: true, followListStyle: { top: refTargetRect.top + 30, right: 10 } })
    }

    render() {
        const { userInfo: { nickname, avatarUrl, userId } } = this.props;
        const { showFollowList, followListStyle } = this.state;
        return (
            <div className="user-info-container">
                <span className="user-name">{nickname}</span>
                <img src={avatarUrl} alt="avatar"></img>
                <div onClick={this.showFollowList.bind(this)}>
                    <FontAwesomeIcon icon={faAngleDown} className='dropdown-button' />
                </div>
                {showFollowList && <FollowList userId={userId} style={followListStyle} />}
            </div>
        )
    }
}