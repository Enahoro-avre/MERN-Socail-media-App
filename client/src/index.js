import React from "react";
import ReactDOM  from "react-dom";
import { Provider } from "react-redux";
// import { createStore , applyMiddleware , compose } from "redux";
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import App from "./App";
import './index.css'

// import reducers from './reducers/posts.reducers'
import reducers from './reducers'
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers , compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App/> 
    </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);