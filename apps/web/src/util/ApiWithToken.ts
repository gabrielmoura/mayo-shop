import Api from './Api';

Api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token')
        if (token) {

            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);
export default Api;