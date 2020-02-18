import * as types from "../Actions/actionConstant";
const initialState = {
  stationEditing: {},
  companyEditing: {},
  tripEditing: {},
  userEditing: {},
  ticketEditing: {},
  adviceCompany: []
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATIONBYID:
      return { ...state, stationEditing: action.payload };

    case types.GET_COMPANYBYID:
      return { ...state, companyEditing: action.payload };

    case types.GET_TRIPBYID:
      return { ...state, tripEditing: action.payload };

    case types.GET_TICKETBYID:
      return { ...state, ticketEditing: action.payload };

    case types.GET_USERBYID:
      return { ...state, userEditing: action.payload };

    case types.CANCEL_BOOKING:
      return { ...state, tripEditing: {} };

    case types.GET_ADVICECOMPANY:
      return {...state, adviceCompany : action.payload}
    default:
      return state;
  }
};

export default layoutReducer;
