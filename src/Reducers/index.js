import {combineReducers} from 'redux';
import auth from './auth';
import trips from './trips';
import stations from './stations';
import companies from './companies';
import tickets from './tickets';
import layout from './layout';

const rootReducer = combineReducers({
    auth,   //auth:auth
    trips,
    stations,
    companies,
    tickets,
    layout
})

export default rootReducer;