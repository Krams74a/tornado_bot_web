import {applyMiddleware, combineReducers, createStore} from "redux";
import {nodesReducer} from "./nodes-reducer";
import {appReducer} from "./app-reducer";
import { thunk } from "redux-thunk";

let reducers = combineReducers({
     nodes: nodesReducer,
     app: appReducer
 });

const store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store;