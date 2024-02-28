import {applyMiddleware, combineReducers, createStore} from "redux";
import {nodesReducer} from "./nodes-reducer";
import {appReducer} from "./app-reducer";
import { thunk } from "redux-thunk";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
     nodes: nodesReducer,
     app: appReducer,
     auth: authReducer
 });

const store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store;