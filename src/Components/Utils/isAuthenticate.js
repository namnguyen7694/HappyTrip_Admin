import jwtDecode from 'jwt-decode';

const isAuthenticate = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwtDecode(token);
    if (decoded.exp < new Date().getTime() /1000) return false;
    return {token, decoded};
}
export default isAuthenticate;