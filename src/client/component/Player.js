import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Player extends Component {
    static propTypes= {
        song: PropTypes.object,
    }
    render() {
        return (
            <div>This is player</div>
        )
    }
}