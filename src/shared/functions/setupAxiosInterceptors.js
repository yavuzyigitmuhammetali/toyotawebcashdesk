import axios from 'axios';

export default function setupAxiosInterceptors(logOut,setIsOnline) {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        logOut();
      } else if (error.response && error.response.status === 500) {
        setIsOnline(false);
      }
      return Promise.reject(error);
    }
  );
}