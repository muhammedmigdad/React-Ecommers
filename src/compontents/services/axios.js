import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/customer/";

axios.defaults.timeout = 60000;

axios.interceptors.response.use(function (response) {
    
    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
    }
    return Promise.reject(error);
});

export default axios