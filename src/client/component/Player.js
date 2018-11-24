import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getSongInfo } from '../utils/apiUtils';
import './Player.scss';

export default class Player extends Component {
    static propTypes = {
        song: PropTypes.object,
        nextSong: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            songInfo: {},
        }
        this.getSongInfo();
    }

    componentDidUpdate(nextProps) {
        if (!_.isEqual(nextProps.player.activeSongId, this.props.player.activeSongId)) {
            this.getSongInfo();
        }
    }

    getSongInfo() {
        const { player: { activeSongId } } = this.props;
        if (activeSongId) {
            getSongInfo(activeSongId, (info) => {
                this.setState({ songInfo: info[0] })
            })
        }
    }

    render() {
        const { nextSong } = this.props;
        const { songInfo } = this.state;
        return (
            <div className="player">
                <audio autoPlay controls="controls" src={songInfo.url} onEnded={nextSong}>You browser doesn't support audio</audio>
            </div>
        )
    }
}