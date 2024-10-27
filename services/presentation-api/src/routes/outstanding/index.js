// Import the required modules
const express = require("express");


// Import helpers functions
const { get_all_cities_outtandings } = require("./helpers")


/* =============================================================================== *
 * Define the router.
 * =============================================================================== */
const router = express.Router();


/* =============================================================================== *
 * Endpoint to get outstanding balances by city.
 * =============================================================================== */
router.get("/cities", async (req, res) => {

    // Fetch the outstanding balances for all cities
    get_all_cities_outtandings()

        .then(results => {

            // If the result is not an array, throw an error
            if (!Array.isArray(results)) {
                throw new Error("Invalid data structure for retrieved cities outstandings");
            }

            // Return a success response with the data
            return res.status(200).json({
                data: results,
                message: `${results.length} cities' outstanding balances retrieved`,
            });

        })

        .catch(error => {

            // Log the error and return a failure response
            console.error("Error retrieving city outstanding balances :", error);
    
            return res.status(500).json({
                message: "Error retrieving city outstanding balances",
                error: error.message,
                stack: error.stack
            });
        
        });

});

/* =============================================================================== *
 * Export the router for use in other parts of the application.
 * =============================================================================== */
module.exports = router;
