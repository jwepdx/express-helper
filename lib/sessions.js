"use strict";
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
/**
 * @function
 * @param {Object} options
 * @param {Object} options.cookie
 * @param {string} options.cookie.domain - Domain the cookie applies to
 * @param {Date} options.cookie.expires - Date the cookie expires
 * @param {boolean} options.cookie.httpOnly - If true, confines cookie to HTTP request only
 * @param {number} options.cookie.maxAge - Time session is valid in milliseconds
 * @param {string} options.cookie.path - Path that cookie is active on
 * @param {boolean|string} options.cookie.sameSite - Sets value for SameSite Attribute, see express-session for more details
 * @param {boolean} options.cookie.secure - If true cookie will only be sent over HTTPS
 * @param {string} options.name - Name of session ID cookie
 * @param {boolean} options.proxy - Is proxy trusted
 * @param {boolean} options.resave - Saves session even if not modified
 * @param {boolean} options.rolling - If true forces session identifier to be set on each response
 * @param {boolean} options.saveUninitialized - Saves session when new and not modified
 * @param {string|Object[]} options.secret - Secret to secure session
 * @param {string} options.unset - What to do when session is unset
 * @param {Object} options.store - Object to configure MySQL Session storage
 * @param {string} options.store.host - Host name for database connection
 * @param {number} options.store.port - Port number for database connection
 * @param {string} options.store.user - Database user
 * @param {string} options.store.password - Password for the above database user
 * @param {string} options.store.database - Database name
 * @param {boolean} options.store.clearExpired - Whether or not to automatically check for and clear expired sessions
 * @param {number} options.store.checkExpirationInterval - How frequently expired sessions will be cleared; milliseconds
 * @param {number} options.store.expiration - The maximum age of a valid session; milliseconds
 * @param {boolean} options.store.createDatabaseTable - Whether or not to create the sessions database table, if one does not already exist
 * @param {number} options.store.connectionLimit - Number of connections when creating a connection pool
 * @param {boolean} options.store.endConnectionOnClose - Whether or not to end the database connection when the store is closed
 * @param {string} options.store.charset - Charset of database
 * @param {Object} options.store.schema - Schema for database
 * @param {sring} options.store.schema.tableName - Name of database table
 * @param {Object} options.store.schema.columnNames - Name of columns in the database table
 * @param {string} options.store.schema.columnNames.session_id - Name of session id column
 * @param {string} options.store.schema.columnNames.expires - Name of expriation column
 * @param {string} options.store.schema.columnNames.data - Name of data column
 * @returns {Function}
 * @see {@link https://github.com/expressjs/session/blob/master/README.md|GitHub} for further information about cookie object
 **/
module.exports = function(options) {
  options.store.password = process.env.PASSWORD || options.store.password;
  const sessionStore = new MySQLStore(options.store);
  session({
    cookie: options.cookie,
    name: options.name || "sessionId",
    proxy: options.proxy || undefined,
    resave: options.resave || false,
    rolling: options.rolling || false,
    saveUninitialized: options.saveUninitialized || false,
    secret: process.env.SECRET || options.secret,
    store: sessionStore,
    unset: options.unset || "keep"
  });
  return session;
};