// * Node.js module to work with file and directory paths
const path = require("path");


// Set NODE_DIRECTORY to the parent directory of the current node
NODE_DIRECTORY = path.join(__dirname, ".");

// Set ROUTES_PATH to the path of the routers directory
ROUTES_PATH = path.join(NODE_DIRECTORY, "routes");

// Import the Express framework for building web applications
const express = require('express');
// Initialize the Express application
const app = express();
// Import the CORS Middleware to enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
// Import the cookie parser middleware to handle cookies
const cookies = require('cookie-parser');
// Import the body-parser middleware to parse incoming request bodies
const body_parser = require('body-parser');

// Enable CORS for all routes
app.use(cors());

// Middleware function to set response headers for CORS
app.use(function (req, res, next) {
    // Allow any origin to access the resources
    res.header("Access-Control-Allow-Origin", "*");
    // Specify which headers can be used in the actual request
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Call the next middleware function in the stack
    next();
});

// Use the cookie parser middleware to parse cookies from incoming requests
app.use(cookies());

// Use body-parser middleware to parse URL-encoded data with the querystring library
app.use(body_parser.urlencoded({ extended: true }));

// Use body-parser middleware to parse JSON data
app.use(body_parser.json());


/**
 * Retrieves the router controller module for the specified router name.
 *
 * @param {string} router_name - The name of the router whose controller module is to be retrieved.
 * @returns {object} The required router controller module.
 * @throws {Error} Will throw an error if the router module cannot be found.
 */
function get_router_controller(router_name) {
    // Dynamically require and return the router module
    return require(path.join(ROUTES_PATH, router_name));
};

// Routers
app.use("/outstandig", get_router_controller('outstanding'));

// Retrieve the port from environment variables
const port = 8093; // process.env.BACK_PORT;

// Validate the retrieved port
if (!port) {
    console.error('The posrt environment variable is not defined.');
    process.exit(1); // Exit the process with an error code
};

// Retrieve the IP address from environment variables
const ip_address = "localhost"; // process.env.IP;

// Validate the retrieved IP address
if (!ip_address) {
    console.error('The IP environment variable is not defined.');
    process.exit(1); // Exit the process with an error code
};

/**
 * Start the server and listen for incoming connections.
 * 
 * @param {object} app - The Express application instance.
 * @param {string} port - The port number on which the server should listen.
 * @param {string} ip_address - The IP address on which the server should bind.
 */
function start_server(app, port, ip_address) {
    app.listen(port, ip_address, () => {
        console.log(`\nPresentation API started running on ${ip_address}:${port}\n`);
    });
};

// Start the back-end server 
start_server(app, port, ip_address);
