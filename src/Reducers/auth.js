import _ from 'lodash'
const initialState = {
    isAuthenticate : false,
    profile : {}
}

const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                isAuthenticate: !_.isEmpty(action.payload),
                profile: action.payload 
            }
        default:
            break;
    }
    
    return state;
}

export default authReducer;