import api from '../Api';
import * as types from './actionConstant'

export const getStations = () => (dispatch) => {
    return api.get('/stations')
        .then(res => {
            dispatch({
                type: types.GET_STATIONS,
                payload: res.data
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}
export const getStationById = (id) => (dispatch) => {
    return api.get(`/stations/${id}`)
        .then(res => {
            dispatch({
                type: types.GET_STATIONBYID,
                payload: res.data
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const createStation = (data) => (dispatch) => {
    return api.post('/stations', data)
        .then(res => {
            dispatch({
                type: types.CREATE_STATION,
                payload: res.data 
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const updateStation = (data) => (dispatch) => {
     return api.put(`/stations/${data._id}`, data)
        .then(res => {
            dispatch({
                type: types.UPDATE_STATION,
                payload: res.data
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const deleteStation = (id) => (dispatch) => {
    return api.delete(`/stations/${id}`)
        .then(() => {
            dispatch(getStations())
        })
}