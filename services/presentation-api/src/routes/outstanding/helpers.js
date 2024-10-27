const axios = require('axios');


function transform_integration_api_response(data) {

    // Create an array to hold the transformed data
    const transformed_data = [];

    // Iterate over the keys (cities) in the original object
    for (const city in data) {

        if (data.hasOwnProperty(city)) {
            // Push the transformed object into the array
            transformed_data.push({
                ville: city,
                clients: data[city].client_count,
                encours: data[city].total_unpaid_amount
            });
        };

    };

    return transformed_data;
}



/**
 * Retrieves all users that can be managr.
 *
 * @returns {Promise<Array>} A promise that resolves to the list of users.
 */
const get_all_cities_outtandings = async () => {

    // Get the outstandig of all cties from the integration API
    const response = await axios.get('localhost:8001/unpaid-invoices-count-by-city');

    return transform_integration_api_response(response);

};


module.exports = {
    get_all_cities_outtandings
}


async function get_all_cities_outstandings() {
    try {
         // Replace with your API URL
        return response.data; // Adjust based on the structure of your API response
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw new Error('Failed to fetch outstanding data');
    }
}
