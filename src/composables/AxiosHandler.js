import axios from "axios";

const AxiosHandler = () => {

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL : 'https://honest-platform-backend.baanbaan.site',
        timeout: 300000
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            config.timeout = 180000;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )


    return { axiosInstance }
}

export default AxiosHandler;