middlewareOptions
  /**
   * @author Jacob Evans
   * @license MIT
   * @description Module to help create an express server with propper middleware and headers
   * @summary Helps create express server
   **/
  "use strict";
const fs = require("fs");
const http = require("http");
const https = require("https");

/**
 * @module http
 * @param {string} routes - Routing Path File (JS file)
 * @param {number} httpPort - Server Port
 * @param {object} middlewareOptions - Configuration options for middleware
 * @param {string} middlewareOptions.views - Folder for application views
 * @param {string} middlewareOptions.viewEngine - Express View Engine
 * @param {string} middlewareOptions.static - Folder to server static files from
 * @param {boolean} middlewareOptions.session - Use express-session
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
 * @param {Function} authFunction - Function for authentication, if null secured routes will error
 * @description Create a HTTP Server
 * @example <caption>Create a HTTP server on port 80</caption>
 * http("./routes.test.js", 80, {
 *   views: "views",
 *   viewEngine: "ejs",
 *   static: "static",
 *   session: {
 *     use: true,
 *     name: "sessionId",
 *     secret: "unknown string",
 *     resave: false,
 *     saveUninitialized: true
 *   },
 *   authFunction: function(req, res, next) {
 *     next();
 *   }
 * });
 **/
module.exports.http = function(routes, httpPort, middlewareOptions, authFunction, sessionOptions) {
  if (typeof routes !== "string" || "undefined") {
    throw new TypeError("Routes file name must be a string.");
  }
  if (typeof httpPort !== "number" || "undefined") {
    throw new TypeError("Port must be a number.");
  }
  if (typeof middlewareOptions !== "object" || "undefined") {
    throw new TypeError("Middleware options must be an object.");
  }
  if (typeof authFunction !== "function" || "undefined") {
    throw new TypeError("Auth Function must be a function.");
  }
  if (typeof sessionOptions !== "object" || "undefined") {
    throw new TypeError("Session options must be an object.");
  }
  var routes = process.env.routes || routes || __dirname + "/routes.js";
  var port = process.env.port || httpPort || 80;
  var middlewareOptions = process.env.options || middlewareOptions || {
    views: "views",
    viewEngine: "ejs",
    static: "static",
    session: false
  };
  const express = require("express")();
  require("./lib/middleware.js")(express, middlewareOptions, sessionOptions);
  require("./lib/route.js")(express, require(routes), authFunction);
  http.createServer(express).listen(port);
};

/**
 * @module https
 * @param {string} routes - Routing Path File
 * @param {number} httpsPort - Server Port
 * @param {object} httpsOptions - Configuration for HTTPS
 * @param {string} httpsOptions.privateKey - Private Key File
 * @param {string} httpsOptions.certificate - Certificate File
 * @param {object} middlewareOptions - Configuration options for server
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
 * @param {Function} authFunction - Function for authentication, if null secured routes will error
 * @description Create a HTTPS Server
 * @example <caption>Create a HTTPS server on port 443</caption>
 * https("./routes.test.js", 443, {
 *  privateKey: "./path/to/privateKey",
 *  certificate: "./path/to/certificate"
 * }, {
 *   views: "views",
 *   viewEngine: "ejs",
 *   static: "static",
 *   session: {
 *     use: true,
 *     name: "sessionId",
 *     secret: "unknown string",
 *     resave: false,
 *     saveUninitialized: true
 *   },
 *   authFunction: function(req, res, next) {
 *     next();
 *   }
 * });
 **/
module.exports.https = function(routes, httpsPort, httpsOptions, middlewareOptions, authFunction, sessionOptions) {
  if (typeof routes !== "string" || "undefined") {
    throw new TypeError("Routes file name must be a string.");
  }
  if (typeof httpPort !== "number" || "undefined") {
    throw new TypeError("Port must be a number.");
  }
  if (typeof httpsOptions !== "object" || "undefined") {
    throw new TypeError("HTTPS options must be an object.");
  }
  if (typeof middlewareOptions !== "object" || "undefined") {
    throw new TypeError("Middleware options must be an object.");
  }
  if (typeof authFunction !== "function" || "undefined") {
    throw new TypeError("Auth Function must be a function.");
  }
  if (typeof sessionOptions !== "object" || "undefined") {
    throw new TypeError("Session options must be an object.");
  }
  const express = require("express")();
  require("./lib/middleware.js")(express, middlewareOptions, sessionOptions);
  require("./lib/route.js")(express, require(routes), authFunction);
  https.createServer({
    key: fs.readFileSync(httpsOptions.privateKey, "utf-8"),
    cert: fs.readFileSync(httpsOptions.certificate, "utf-8")
  }, express).listen(httpsPort);
};

/**
 * @module redirectHttp
 * @param {boolean} redirect - True to redirect HTTP to HTTPS
 * @description Redirect HTTP to HTTPS
 * @example <caption>Redirect HTTP to HTTPS</caption>
 * redirectHttp(true);
 **/
module.exports.redirectHttp = function(redirect) {
  if (redirect === true) {
    const express = require("express")();
    express.use(require("helmet")());
    express.all("*", function(request, response) {
      if (request.protocol === "http") {
        response.redirect("https://" + request.hostname + request.originalUrl);
      }
    });
    http.createServer(express).listen(80);
  }
};