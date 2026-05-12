import axios from 'axios';

const axiosInstance = axios.create({
    // Agregamos el /v1 aquí para no escribirlo siempre
    baseURL: 'http://localhost:8000/api/v1', 
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

export default axiosInstance;