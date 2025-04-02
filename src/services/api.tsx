import axios from "axios"



const api = axios.create({
    baseURL: "https://apidrink.celleta.com"
});



export default api;