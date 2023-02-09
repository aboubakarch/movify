import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory as createHistory } from "history";
import { useMemo } from "react";
import thunkMiddleware from "redux-thunk";

import reducers, { initialState } from "store/reducers/reducers";
// import loggerMiddleware from "./middleware/logger";

let store;

const { createReduxHistory, routerMiddleware } = createReduxHistoryContext({
  history: createHistory(),
});

const initStore = (preloadedState = initialState) => {
  const middlewares = [thunkMiddleware, routerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  return createStore(reducers, preloadedState, composedEnhancers);
};

export const history = createReduxHistory(initStore());

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore({});

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    // Reset the current store
    store = undefined;
  }

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return { store };
};
