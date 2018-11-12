import React, { Component } from 'react';
import ReactDom from 'react-dom';
import MainPanel from './component/MainPanel';
import './index.scss';

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <MainPanel />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'))