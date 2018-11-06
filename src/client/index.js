import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    render() {
        return (
            <div>Hello Listen With You</div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'))