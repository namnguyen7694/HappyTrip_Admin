import * as types from "../Actions/actionConstant";
const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;