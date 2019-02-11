import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import { configureStore } from "./redux/store";
import { fetchSettings, ThunkDispatch } from "./redux/actions";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// Fetch initial shortcuts
const dispatch: ThunkDispatch = store.dispatch;
dispatch(fetchSettings());
