import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FollowList.scss';
import { getFollows } from '../utils/apiUtils';

export default class FollowList extends Component {
    static propTypes = {
        userId: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            follows: [],
        }
    }

    componentDidMount() {
        const { userId } = this.props;
        getFollows(userId).then(follows => this.setState({ follows })).catch(error => console.log(error))
    }

    render() {
        const { style } = this.props;
        const { follows = [] } = this.state;
        return (
            <div className='follow-list-container' style={style}>
                {follows.map((f, index) => (<div key={index}>{f.nickname}</div>))}
            </div>
        )
    }
}