import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SongItem.scss';

export default class SongItem extends Component {
    static propTypes = {
        song: PropTypes.object,
        play: PropTypes.func,
    }

    render() {
        const { song: { name, artists }, play } = this.props;
        const singerName = (artists || this.props.song.ar).map(artist => artist.name).join(', ');
        return (
            <div className="song-item-container" onClick={play}>
                <div className="song-name text-overflow" title={name}>{name}</div>
                <div className="singer-name text-overflow" title={singerName}>{singerName}</div>
            </div>
        )
    }
}