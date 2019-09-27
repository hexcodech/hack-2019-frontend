//react
import { hot } from "react-hot-loader/root";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { throttle } from "lodash";

import App from "./App";
import "./scss/global.scss";
import { loadState, saveState } from "./local-storage";
import { createRootReducer } from "./reducers";

//Load state from local storage and create history object
const persistedState = loadState();
const history = createBrowserHistory();

//and the redux store
const store = createStore(
  createRootReducer(history),
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerMiddleware(history))
  )
);

//storing some keys of the application state in the localstorage
store.subscribe(
  throttle(() => {
    //const { authentication } = store.getState();

    saveState({
      //authentication
    });
  }, 1000)
);

const render = (Component: React.ReactType) => {
  ReactDOM.render(
    <Component history={history} store={store} />,
    document.getElementById("root")
  );
};

//do the initial render
render(App);
