import {combineReducers} from 'redux';
import auth from './auth';
import trips from './trips';
import stations from './stations';
import companies from './companies';
import tickets from './tickets';
import users from './users';
import layout from './layout';

const rootReducer = combineReducers({
    auth,   
    trips,
    stations,
    companies,
    tickets,
    users,
    layout
})

export default rootReducer;