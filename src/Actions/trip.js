import api from '../Api';
import * as types from './actionConstant';

export const getTrips = () => (dispatch) => {
    return api.get('/trips')
        .then(res => {
            dispatch({
                type: types.GET_TRIPS,
                payload: res.data
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const getTripById = (id) => (dispatch) => {
    return api.get(`/trips/${id}`)
        .then(res => {
            dispatch({
                type: types.GET_TRIPBYID,
                payload: res.data
            });
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const createTrip = (data) => (dispatch) => {
    return api.post('/trips', data)
        .then(res => {
            dispatch({
                type: types.CREATE_TRIP,
                payload: res.data  //object
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const updateTrip = (data) => (dispatch) => {
    return api.put(`/trips/${data._id}`, data)
        .then(res => {
            dispatch({
                type: types.UPDATE_TRIP,
                payload: res.data
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const deleteTrip = (id) => (dispatch) => {
    api.delete(`/trips/${id}`)
    .then(() => {
        dispatch(getTrips())
    })
}