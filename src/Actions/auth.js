/**
 * @todo login
 * @param 
 */

import api from '../Api';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../Components/Utils/setAuthToken';
import * as types from './actionConstant';

export const login = (credentials) => (dispatch) => {
  return api
    .post("/users/login", credentials)
    .then(res => {
        localStorage.setItem('token',res.data.token);
        const {token} = res.data;
        const decoded = jwtDecode(token);
        dispatch( setCurrentUser(decoded));
        setAuthToken(token);
        return Promise.resolve({message: "Đăng nhập thành công"})
    })
    .catch(err => Promise.reject({message: "Đăng nhập thất bại", err})
    );
};

export const signup = credentials => (dispatch) => {
  return api
    .post("/users", credentials)
    .then(() => {
        dispatch( setCurrentUser(credentials));
        return Promise.resolve({message: "Sign up success"})
    })
    .catch(err => Promise.reject({
        message: "Đăng ký không thành công ",
        err
    }))
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch( setCurrentUser({}))
    
    setAuthToken()
}

export const setCurrentUser = (data) => {
    return{
        type: types.SET_CURRENT_USER,
        payload: data
    }
}

export const getUsers = () => (dispatch) => {
    return api.get('/users')
        .then(res => {
            dispatch({
                type: types.GET_USERS,
                payload: res.data
            });
            
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const deleteUser = (id) => (dispatch) => {
    return api.delete(`/users/${id}`)
        .then(() => {
            dispatch(getUsers())
        })
}