import api from '../Api';
import * as types from './actionConstant';

export const getCompanies = () => (dispatch) => {
    return api.get('/companies')
        .then(res => {
            dispatch({
                type: types.GET_COMPANIES,
                payload: res.data
            });
            
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const getCompanyById = (id) => (dispatch) => {
    return api.get(`/companies/${id}`)
        .then(res => {
            dispatch({
                type: types.GET_COMPANYBYID,
                payload: res.data
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}
export const getAdviseCompany = (data) => (dispatch) => {
    return api.get(`/companies/${data.fromStation}/${data.toStation}`)
        .then(res => {
            dispatch({
                type: types.GET_ADVICECOMPANY,
                payload: res.data
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const createCompany = (data) => (dispatch) => {
    return api.post('/companies', data)
        .then(res => {
            dispatch({
                type: types.CREATE_COMPANY,
                payload: res.data  //object
            })
            Promise.resolve(res.data)
        })
        .catch(err => Promise.reject(err))
}

export const updateCompany = (data) => (dispatch) => {
    return api.put(`/companies/${data._id}`, data)
       .then(res => {
           dispatch({
               type: types.UPDATE_COMPANY,
               payload: res.data
           })
           Promise.resolve(res.data)
       })
       .catch(err => Promise.reject(err))
}

export const deleteCompany = (id) => (dispatch) => {
    return api.delete(`/companies/${id}`)
        .then(() => {
            dispatch(getCompanies())
        })
}