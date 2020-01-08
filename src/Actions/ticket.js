import api from '../Api';
import * as types from './actionConstant';

export const getTickets = () => (dispatch) => {
    api.get('/tickets')
        .then(res => {
            dispatch({
                type: types.GET_TICKETS,
                payload: res.data
            })
        })
        .catch(console.log())
}

export const createTicket = (data) => (dispatch) => {
    api.post('/tickets/booking', data)
        .then(res => {
            dispatch({
                type: types.CREATE_TICKET,
                payload: res.data  //object
            })
        })
}