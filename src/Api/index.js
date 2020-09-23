import axios from 'axios';

const api = axios.create({
    baseURL : "https://vexere-happytrip.herokuapp.com/api"
})
export default api