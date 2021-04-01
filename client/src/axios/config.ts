import axios from "axios";


const host = 'localhost:3030';
const BASE_URL = `http://${host}`;

const axiosInstance =  axios.create({
    baseURL:BASE_URL,
});


export default axiosInstance;