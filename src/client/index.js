import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Player from './component/Player';
import './index.scss';

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <Player />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'))