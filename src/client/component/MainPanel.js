import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainPanel.scss'
import { getLoginStatus } from '../utils/authUtils';
import SongItem from './SongItem';
import Player from '../containers/PlayerContainer';
import UserInfo from './UserInfo';

export default class MainPanel extends Component {
    static propTypes = {
        mainPanel: PropTypes.object,
        playSong: PropTypes.func,
        initLoad: PropTypes.func,
        loadPlayList: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
        }
    }

    componentWillMount() {
        const { initLoad } = this.props;
        initLoad();
    }

    componentDidMount() {
        getLoginStatus((data) => {
            this.setState({
                userInfo: data.profile,
            })
        }, (err) => {
            console.log(err);
        });
    }

    getCreatedPlayList() {
        const { mainPanel: { playList = [] } } = this.props;
        return playList.filter(list => !list.subscribed)
    }

    getSubscribedPlayList() {
        const { mainPanel: { playList = [] } } = this.props;
        return playList.filter(list => list.subscribed)
    }

    renderPlayListDetail() {
        const { mainPanel: { playListDetail, activePlayList }, playSong, } = this.props;
        const songs = playListDetail && playListDetail.tracks || [];
        if (songs.length > 0) {
            return (
                <div>
                    {songs.map((song, index) => <SongItem key={index} song={song} play={() => playSong(song.id)} />)}
                </div>
            )
        }
        return null;
    }

    render() {
        const { userInfo } = this.state;
        const { loadPlayList } = this.props;
        const createdPlayLists = this.getCreatedPlayList();
        const subscribedPlayLists = this.getSubscribedPlayList();
        return (
            <div className="main-panel-container">
                <div className='top-bar-container'>
                    <UserInfo userInfo={userInfo} />
                </div>
                <div className='main-view-container'>
                    <div className='play-lists-container'>
                        <div className='play-list-label'>推荐</div>
                        <div className='play-list' onClick={() => loadPlayList('recommend')}>今日推荐</div>
                        <div className='play-list-label'>创建的歌单</div>
                        {createdPlayLists.map((list, index) => (
                            <div key={index} className='play-list text-overflow' title={list.name} onClick={() => loadPlayList(list.id)}>{list.name}</div>
                        ))}
                        <div className='play-list-label'>收藏的歌单</div>
                        {subscribedPlayLists.map((list, index) => (
                            <div key={index} className='play-list text-overflow' title={list.name} onClick={() => loadPlayList(list.id)}>{list.name}</div>
                        ))}
                    </div>
                    <div className="songs-container">
                        {this.renderPlayListDetail()}
                    </div>
                </div>
                <div className="player-container">
                    <Player />
                </div>
            </div>
        )
    }
}
