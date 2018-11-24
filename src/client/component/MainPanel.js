import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainPanel.scss'
import { getLoginStatus } from '../utils/authUtils';
import SongItem from './SongItem';
import Player from '../containers/PlayerContainer';

export default class MainPanel extends Component {
    static propTypes = {
        mainPanel: PropTypes.object,
        playSong: PropTypes.func,
        initLoad: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            nickname: '',
            avatarUrl: '',
        }
    }

    componentWillMount() {
        const { initLoad } = this.props;
        initLoad();
    }

    componentDidMount() {
        getLoginStatus((data) => {
            const { userId, nickname, avatarUrl } = data.profile;
            this.setState({
                userId,
                nickname,
                avatarUrl,
            })
        }, (err) => {
            console.log(err);
        });
    }

    render() {
        const { nickname, avatarUrl } = this.state;
        const { mainPanel: { songList }, playSong } = this.props;
        return (
            <div className="main-panel-container">
                <div className="user-info-container">
                    <span className="user-name">{nickname}</span>
                    <img src={avatarUrl} alt="avatar"></img>
                </div>
                <div className="song-list">
                    {songList.map((song, index) => (<SongItem key={index} song={song} play={() => playSong(song.id)} />))}
                </div>
                <div className="player-container">
                    <Player />
                </div>
            </div>
        )
    }
}
