import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './component/App';
import { player, mainPanel } from './reducers/reducers';
import { request, logger } from './middlewares'
import './index.scss';
import { initMessageHandler } from './workerHandler';

const messageWorker = new Worker('messageWorker.js');

const store = createStore(combineReducers({ player, mainPanel }), applyMiddleware(logger, request));

initMessageHandler(store, messageWorker);

window.store = store;

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'))