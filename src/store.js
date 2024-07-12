import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { SERVER } from './constants';
import reducer from "./reducers/";


const client = axios.create({
    baseURL: SERVER,
    responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
