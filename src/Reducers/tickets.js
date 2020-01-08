const initialState = [];

const ticketReducer = ( state = initialState, action) => {
    switch (action.type) {
        case "GET_TICKETS":
            return action.payload

        case "CREATE_TICKET":
            return [...state, action.payload]
            
        default:
            return state;
        }
}

export default ticketReducer