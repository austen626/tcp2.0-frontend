import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers';
 
const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(compose(applyMiddleware(ReduxThunk)))
);

export default store;