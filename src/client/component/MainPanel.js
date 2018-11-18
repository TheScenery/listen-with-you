import React, { Component } from 'react';
import './MainPanel.scss'
import { getLoginStatus } from '../utils/authUtils';
import { getRecommendSongs } from '../utils/apiUtils';
import SongItem from './SongItem';
import Player from './Player';

export default class MainPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            nickname: '',
            avatarUrl: '',
            songs: [],
        }
        this.playSong = this.playSong.bind(this);
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
        getRecommendSongs((songs) => {
            this.setState({ songs })
        }, (err) => {
            console.log(err);
        });
    }

    playSong(song) {
        this.setState({ playingSong: song })
    }

    render() {
        const { nickname, avatarUrl, songs, playingSong } = this.state;
        return (
            <div className="main-panel-container">
                <div className="user-info-container">
                    <span className="user-name">{nickname}</span>
                    <img src={avatarUrl} alt="avatar"></img>
                </div>
                <div className="song-list">
                    {songs.map((song, index) => (<SongItem key={index} song={song} play={() => this.playSong(song)} />))}
                </div>
                <div className="player-container">
                    <Player song={playingSong} />
                </div>
            </div>
        )
    }
}
