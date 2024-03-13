import {applyMiddleware, combineReducers, createStore} from "redux";
import {nodesReducer} from "./nodes-reducer";
import {appReducer} from "./app-reducer";
import { thunk } from "redux-thunk";
import authReducer from "./auth-reducer";
import listsReducer from "./lists-reducer";

let reducers = combineReducers({
     nodes: nodesReducer,
     app: appReducer,
     auth: authReducer,
     lists: listsReducer
 });

const store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store;