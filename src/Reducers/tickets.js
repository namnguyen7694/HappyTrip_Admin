import * as types from '../Actions/actionConstant'
const initialState = [];

const ticketReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.GET_TICKETS:
            return action.payload

        case types.CREATE_TICKET:
            return [...state, action.payload]
            
        default:
            return state;
        }
}

export default ticketReducer