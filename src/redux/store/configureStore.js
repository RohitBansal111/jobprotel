import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./../reducers/rootReducer"
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

const store = (PreloadState) => createStore(
  rootReducer,
  PreloadState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  ),
);
export default store 