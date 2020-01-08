import * as types from "../Actions/actionConstant";
const initialState = [];

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMPANIES:
      return action.payload;

    case types.CREATE_COMPANY:
      return [...state, action.payload];

    case types.UPDATE_COMPANY:
      const company = action.payload;
      const index = state.findIndex(com => com._id === company._id);
      state[index] = company;
      return [...state];
    default:
      return state;
  }
};

export default companyReducer;
