import axios from 'axios';

/**
 * Configures axios to globally intercept and handle HTTP responses.
 * This function attaches interceptors to axios which manage responses based on their HTTP status codes.
 *
 * @param {Function} logOut - Invoked to log out the user, typically when authentication fails or session expires.
 * @param {Function} setIsOnline - Updates the online status of the application.
 * @param {Function} setStatus - Sets the status in the application context.
 */
export default function setupAxiosInterceptors(logOut, setIsOnline, setStatus) {
    axios.interceptors.response.use(
        // Pass through the response if successful.
        response => response,
        // Handle errors by checking the status code and taking appropriate actions.
        error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401: // Handle unauthorized access, such as expired or invalid authentication.
                        logOut();
                        break;
                    case 500: // Handle server errors by marking the app as offline and resetting the status.
                        setIsOnline(false);
                        setStatus(null);
                        break;
                    default:
                        // No action for other types of errors.
                        break;
                }
            }
            // Reject the error for further handling by the application.
            return Promise.reject(error);
        }
    );
}