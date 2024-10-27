


/**
 * Retrieves all users that can be managr.
 *
 * @returns {Promise<Array>} A promise that resolves to the list of users.
 */
const get_all_cities_outtandings = async () => {

    return [
        { "ville": "Paris", "clients": 120, "encours": 5000 },
        { "ville": "Lyon", "clients": 80, "encours": 3000 },
        { "ville": "Marseille", "clients": 60, "encours": 2000 },
    ];

};


module.exports = {
    get_all_cities_outtandings
}