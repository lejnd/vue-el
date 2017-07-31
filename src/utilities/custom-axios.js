import axios from 'axios';

const customAxios = axios.create({
    baseURL: '/api',
    // baseURL: 'http://10.66.1.119:8004',
    timeout: 15000,
    validateStatus: () => true,
});

export default customAxios;
