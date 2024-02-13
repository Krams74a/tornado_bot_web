import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppContainer from "./Components/App/App"
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./redux/store-redux"
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style = 'background: #222222'
document.title = "Леночка"
root.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>
);