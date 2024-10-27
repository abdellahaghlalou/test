import axios from "axios";


// Set up headers with the authorization token from local storage
const headers = { authorization: `Bearer ${ localStorage.getItem("token") }`};


/**
 * Handles Axios responses.
 * 
 * @param {Function} axios_method - The Axios method to be executed.
 * @returns {Object} The response data if successful, or an error object if an error occurs.
 */
async function handle_response(axios_method) {

    try {

        // Execute the provided Axios method
        const response = await axios_method();

        // Return the data and the response status if status code is in range of 2xx
        return { ...response.data, response_status: response.status };

    }

    catch (error) {

        // Handle response errors (status codes outside the range of 2xx)
        if (error.response) {
            console.error('Server response error :', error.response.data);
            return { error: true, message: error.response.data.message };
        }
        
        // Handle cases where no response was received
        else if (error.request) {
            console.error('No response from server :', error.request);
            return { error: true, message: "Le serveur ne répond pas" }; // Probably network or connection-related issues
        }
        
        // Handle other errors (e.g., request setup errors)
        else {
            console.error('Request setup error :', error.message);
            return { error: true, message: "Erreur de configuration de la demande" };
        };
    
    };

};

/**
 * Base service class for making HTTP requests.
 */
export default class BaseService {

    _base_url = null;

    /**
     * Constructs the base URL for the service.
     * @param {string} rel_url - The relative URL for the service endpoint.
     */
    constructor(rel_url) {
        this._base_url = "http://localhost:8093" + rel_url;
    };

    /**
     * Makes a GET request to the base URL.
     * @returns {Promise<Object>} The response data or error object.
     */
    get = async () => await handle_response(async () => await axios.get(this._base_url + "/", { headers }));

    /**
     * Makes a POST request to the base URL with the provided data.
     * @param {Object} data - The data to be sent in the POST request.
     * @returns {Promise<Object>} The response data or error object.
     */
    post = async (data) => await handle_response(async () => await axios.post(this._base_url, data, { headers }));

    /**
     * Makes a PUT request to the base URL with the provided data.
     * @param {Object} data - The data to be sent in the PUT request, including an `id` field.
     * @returns {Promise<Object>} The response data or error object.
     */
    put = async (data) => await handle_response(async () => await axios.put(this._base_url + "/" + data.id, data, { headers }));

    /**
     * Makes a DELETE request to the base URL with the provided data.
     * @param {Object} data - The data to be sent in the DELETE request, including an `id` field.
     * @returns {Promise<Object>} The response data or error object.
     */
    delete = async (data) => await handle_response(async () => await axios.delete(this._base_url + "/" + data.id, { headers }));

    /**
     * Makes a custom GET request to the relative URL.
     * @param {string} rel_url - The relative URL for the GET request.
     * @returns {Promise<Object>} The response data or error object.
     */
    custom_get = async (rel_url) => await handle_response(async () => await axios.get(this._base_url + rel_url, { headers }));

    /**
     * Makes a custom POST request to the relative URL with the provided data.
     * @param {string} rel_url - The relative URL for the POST request.
     * @param {Object} data - The data to be sent in the POST request.
     * @returns {Promise<Object>} The response data or error object.
     */
    custom_post = async (rel_url, data) => await handle_response(async () => await axios.post(this._base_url + rel_url, data, { headers }));

    /**
     * Makes a custom PUT request to the relative URL with the provided data.
     * @param {string} rel_url - The relative URL for the PUT request.
     * @param {Object} data - The data to be sent in the PUT request, including an `id` field.
     * @returns {Promise<Object>} The response data or error object.
     */
    custom_put = async (rel_url, data) => await handle_response(async () => await axios.put(this._base_url + rel_url + "/" + data.id, data, { headers }));

    /**
     * Makes a custom DELETE request to the relative URL with the provided data.
     * @param {string} rel_url - The relative URL for the DELETE request.
     * @param {Object} data - The data to be sent in the DELETE request, including an `id` field.
     * @returns {Promise<Object>} The response data or error object.
     */
    custom_delete = async (rel_url, data) => await handle_response(async () => await axios.delete(this._base_url + rel_url + "/" + data.id, { headers }));

    /**
     * Makes a POST request to the relative URL with the provided data and expects a blob response.
     * @param {string} rel_url - The relative URL for the POST request.
     * @param {Object} data - The data to be sent in the POST request.
     * @returns {Promise<Object>} The response data or error object.
     */
    blob_post = async (rel_url, data) => await handle_response(async () => {
        // https://stackoverflow.com/questions/74548481/download-pdf-file-from-server-response
        const _headers = { key: "value", ...headers };
        return await axios.post(this._base_url + rel_url, data, { headers: _headers, responseType: "blob" });
    });

}
