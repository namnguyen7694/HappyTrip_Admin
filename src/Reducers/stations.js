import * as types from '../Actions/actionConstant'
const initialState = [];

const stationReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.GET_STATIONS:
            return action.payload

        case types.CREATE_STATION:
            return [...state, action.payload]

        case types.UPDATE_STATION:
            const station = action.payload;
            const index = state.findIndex(st => st._id === station._id)
            state[index] = station
            return [...state]
            
        default:
            return state;
        }
}

export default stationReducer