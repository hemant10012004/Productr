import axios from 'axios';

// Create an Axios instance pointing to the backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Interceptor to inject the Auth Token into requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('productr_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
