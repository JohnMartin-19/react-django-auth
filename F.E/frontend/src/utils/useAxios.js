import axios from "axios";
import jwt_decode from "jwt_decode";
import dayjs from "dayjs";
import React,{useContext} from "react";
import { authContext } from "../components/auth.component";

const baseURL = 'http://127.0.0.1:8000/api/v1/'

const useAxios = () => {
    const [authTokens, setUser,setAuthTokens] = useContext(authContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization:`Bearer ${authTokens?.access}`}
    }).access
    
    axiosInstance.Interceptors.request.use(async req =>{
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    
        if (isExpired) return req
    
        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh
        })
    
        localStorage.setItem("authTokens", JSON.stringify(response.data))
    
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
    
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req
    })
    return axiosInstance
}

export default useAxios