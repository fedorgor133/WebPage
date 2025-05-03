import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

// Un interceptor es una función que axios lanza antes de hacer cualquier petición o justo cuando recibe un error.
// En este caso se utiliza para comprobar si el token es valido y si no lo es se hace logOut del usuario
//
function logOutInterceptor(logOut: () => void) {
  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        logOut();
      }
      return Promise.reject(error);
    }
  );
}

// Create an interceptor that check if the token is valid and log out if it is not

export default axiosClient;
export { logOutInterceptor };
