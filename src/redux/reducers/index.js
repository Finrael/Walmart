import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {set_Pricing} from './getDataPricing'
import {add_promo} from './addDiscountReducer'
import thunk from 'redux-thunk';

// combine reducer and adds the required reducers to work
const rootReducer = combineReducers({set_Pricing, add_promo});
// allows the state to work with redux devtools extension 
const  realCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const create= realCompose (applyMiddleware(thunk))(createStore);
export default create(rootReducer);