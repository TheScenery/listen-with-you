import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReduxToastar, { reducer as toastrReducers } from 'react-redux-toastr';
import App from './component/App';
import { player, mainPanel, listenWithInfo } from './reducers/reducers';
import { request, logger } from './middlewares'
import './index.scss';
import { initMessageHandler } from './workerHandler';

const messageWorker = new Worker('messageWorker.js');

const reducers = {
    player,
    mainPanel,
    listenWithInfo,
    toastr: toastrReducers,
}

const store = createStore(combineReducers(reducers), applyMiddleware(logger, request));

initMessageHandler(store, messageWorker);

window.store = store;

ReactDom.render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <ReduxToastar />
        </div>
    </Provider>,
    document.getElementById('root'))