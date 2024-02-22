import axios from "axios";

export function setupAxiosInterceptors(isOnline,setAuth,errorText='Offline - Unable to make request') {
    axios.interceptors.request.use(
        (config) => {
            if (!isOnline) {
                return Promise.reject(new Error(errorText));
            }
            return config;
        },
        (error) => {
            if (error.response && error.response.status === 401){
                setAuth(false);
            }
            return Promise.reject(error);
        }
    );
}

export function getStatus(){
    return  axios.get("/api/v1/getstatus");
}

export function testLogin(){
    return  axios.get("/api/v1/test");
}

