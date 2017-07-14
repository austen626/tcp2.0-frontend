import axios from 'axios';
import { pushNotification } from 'utils/notification';
export const baseUrl = 'https://dev-apiv2.traviscapitalpartners.com/api/';
const api = axios.create({
    baseURL: baseUrl
});

api.interceptors.request.use(
    async function(config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

api.interceptors.response.use((response) => {
    if (response && response.message) {
        return Promise.reject(response);
    }
    return response;
}, (error) => {
    if (!error) {
        return Promise.reject(error);
    }
    if (error.status === 440 || error.status === 401) {
        pushNotification('Your session has expired please login again.', 'error', 'TOP_RIGHT', 3000);
    }
    return Promise.reject(error);
});

export default api;