/**
 * @todo login
 * @param 
 */

import api from '../Api';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../Components/Utils/setAuthToken';

export const login = (credentials) => (dispatch) => {
  return api
    .post("/users/login", credentials)
    .then(res => {
        localStorage.setItem('token',res.data.token);
        const {token} = res.data
        //thay doi reducers
        const decoded = jwtDecode(token);
        dispatch( setCurrentUser(decoded))
        
        setAuthToken(token)
          //redirect
        return Promise.resolve({message: "Login success"})
    })
    .catch(()=> Promise.reject({message: "Login fail"})
    );
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch( setCurrentUser({}))
    
    setAuthToken()
}

export const setCurrentUser = (data) =>{
    return{
        type: "SET_CURRENT_USER",
        payload: data
    }
}