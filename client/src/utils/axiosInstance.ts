import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_PUBLIC_GO_API,
    timeout : 10000,
    headers : {
        "Content-Type" : "application/json"
    },
    withCredentials : true
})