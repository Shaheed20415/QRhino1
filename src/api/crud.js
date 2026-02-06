import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Match your server PORT

// Create an instance to include the token automatically
const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Or however you store your secretKey
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
});

export const getAll = (resource) => api.get(`/${resource}`);
export const create = (resource, data) => api.post(`/${resource}`, data);
export const update = (resource, id, data) => api.put(`/${resource}/${id}`, data);
export const remove = (resource, id) => api.delete(`/${resource}/${id}`);

// GET subscriptions by user
export const getSubscriptionsByUser = (userId) =>
  api.get(`/subscription/user/${userId}`);
