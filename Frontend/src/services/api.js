import axios from 'axios';

const configuredBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000')
    .replace(/\/+$/, '');
const apiBaseUrl = configuredBaseUrl.endsWith('/api')
    ? configuredBaseUrl
    : `${configuredBaseUrl}/api`;

const api = axios.create({

    baseURL: apiBaseUrl,

    headers: {
        'Content-Type': 'application/json',
    },
})

    //Automatically send JWT token with protected API requests

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    }, (error) => {
        return Promise.reject(error);
    })



export default api