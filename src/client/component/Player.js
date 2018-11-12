import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Player extends Component {
    static propTypes= {
        song: PropTypes.object,
    }
    render() {
        return (
            <div>
                <audio autoPlay="autoPlay" controls="controls" src="http://m10.music.126.net/20181109005840/7a68024224b6e65bb283157a269db953/ymusic/03e2/93ce/3e32/7683301af072e4b50f2f53c6f4f2e3d9.mp3">You browser doesn't support audio</audio>
            </div>
        )
    }
}