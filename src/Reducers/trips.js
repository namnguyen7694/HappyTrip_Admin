import * as types from '../Actions/actionConstant'
const initialState = [];

const tripReducer = ( state = initialState, action) => {
    switch (action.type) {
      case types.GET_TRIPS:
        return action.payload;

      case types.CREATE_TRIP:
        return [...state, action.payload];

      case types.UPDATE_TRIP:
        const trip = action.payload;
        const index = state.findIndex(tr => tr._id === trip._id);
        state[index] = trip;
        return [...state];
      default:
        return state;
    }
}

export default tripReducer