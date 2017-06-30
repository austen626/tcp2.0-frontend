import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import auth from './auth';
import customer from './customer';
import sales from './sales';
import customers from './customers';
import admin from './admin';
import dealer from './dealer';
import userReducer from './userReducer';

const appReducer = combineReducers({
    auth,
    customer,
    sales,
    customers,
    admin,
    dealer,
    user: userReducer,
    form: formReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
};

export default rootReducer;