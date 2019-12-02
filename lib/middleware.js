"use strict";
const bodyParser = require("body-parser");
/**
 * @function
 * @param {Function} express - Express Function
 * @param {object} middlewareOptions - Configuration options for server middleware
 * @param {string} middlewareOptions.views - Folder for application views
 * @param {string} middlewareOptions.viewEngine - Express View Engine
 * @param {string} middlewareOptions.static - Folder to server static files from
 * @param {boolean} middlewareOptions.session - Use express-session?
 * @param {Object} sessionOptions - Configuration for session
 * @param {Object} sessionOptions.cookie - Object for configuring session cookie
 * @param {string} sessionOptions.cookie.domain - Domain the cookie applies to
 * @param {Date} sessionOptions.cookie.expires - Date the cookie expires
 * @param {boolean} sessionOptions.cookie.httpOnly - If true, confines cookie to HTTP request only
 * @param {number} sessionOptions.cookie.maxAge - Time session is valid in milliseconds
 * @param {string} sessionOptions.cookie.path - Path that cookie is active on
 * @param {boolean|string} sessionOptions.cookie.sameSite - Sets value for SameSite Attribute, see express-session for more details
 * @param {boolean} sessionOptions.cookie.secure - If true cookie will only be sent over HTTPS
 * @param {string} sessionOptions.name - Name of session ID cookie
 * @param {boolean} sessionOptions.proxy - Is proxy trusted
 * @param {boolean} sessionOptions.resave - Saves session even if not modified
 * @param {boolean} sessionOptions.rolling - If true forces session identifier to be set on each response
 * @param {boolean} sessionOptions.saveUninitialized - Saves session when new and not modified
 * @param {string|Object[]} sessionOptions.secret - Secret to secure session
 * @param {string} sessionOptions.unset - What to do when session is unset
 * @param {Object} sessionOptions.store - Object to configure MySQL Session storage
 * @param {string} sessionOptions.store.host - Host name for database connection
 * @param {number} sessionOptions.store.port - Port number for database connection
 * @param {string} sessionOptions.store.user - Database user
 * @param {string} sessionOptions.store.password - Password for the above database user
 * @param {string} sessionOptions.store.database - Database name
 * @param {boolean} sessionOptions.store.clearExpired - Whether or not to automatically check for and clear expired sessions
 * @param {number} sessionOptions.store.checkExpirationInterval - How frequently expired sessions will be cleared; milliseconds
 * @param {number} sessionOptions.store.expiration - The maximum age of a valid session; milliseconds
 * @param {boolean} sessionOptions.store.createDatabaseTable - Whether or not to create the sessions database table, if one does not already exist
 * @param {number} sessionOptions.store.connectionLimit - Number of connections when creating a connection pool
 * @param {boolean} sessionOptions.store.endConnectionOnClose - Whether or not to end the database connection when the store is closed
 * @param {string} sessionOptions.store.charset - Charset of database
 * @param {Object} sessionOptions.store.schema - Schema for database
 * @param {sring} sessionOptions.store.schema.tableName - Name of database table
 * @param {Object} sessionOptions.store.schema.columnNames - Name of columns in the database table
 * @param {string} sessionOptions.store.schema.columnNames.session_id - Name of session id column
 * @param {string} sessionOptions.store.schema.columnNames.expires - Name of expriation column
 * @param {string} sessionOptions.store.schema.columnNames.data - Name of data column
 * @returns {Function} - Express Function
 **/
module.exports = function(express, middlewareOptions, sessionOptions) {
  var views = middlewareOptions.views || __dirname + "/views";
  express.set("views", views);
  var viewEngine = middlewareOptions.viewEngine || "ejs";
  express.set("view engine", viewEngine);
  express.use(require("helmet")());
  var staticDirectory = middlewareOptions.static || "static";
  express.use(require("express").static(staticDirectory));
  express.use(require("express").static("node_modules"));
  express.use(require("cookie-parser")());
  express.use(bodyParser.urlencoded({
    extended: false
  }));
  express.use(bodyParser.json());
  if (sessionOptions != undefined) {
    express.use(require("./sessions.js")(sessionOptions));
  }
  return express;
};