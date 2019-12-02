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
 * @param {object} options - Configuration options for server
 * @param {string} options.views - Folder for application views
 * @param {string} options.viewEngine - Express View Engine
 * @param {string} options.static - Folder to server static files from
 * @param {object} options.session - Configuration for express-session
 * @param {boolean} options.session.use - Use express-session?
 * @param {string} options.session.name - Name for session
 * @param {string} options.session.secret - Session secret
 * @param {boolean} options.session.resave - Resave Session
 * @param {boolean} options.session.saveUninitialized - Save Uninitialized
 * @param {Function} options.authFunction - Function for authentication, if null secured routes will error
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
module.exports.http = function(routes, httpPort, options) {
  var routes = process.env.routes || routes || __dirname + "/routes.js";
  var port = process.env.port || httpPort || 80;
  var options = process.env.options || options || {
    views: "views",
    viewEngine: "ejs",
    static: "static",
    session: {
      use: false,
    }
  };
  const express = require("express")();
  require("./lib/middleware.js")(express, options);
  require("./lib/route.js")(express, require(routes), options.authFunction);
  http.createServer(express).listen(port);
};

/**
 * @module https
 * @param {string} routes - Routing Path File
 * @param {number} httpsPort - Server Port
 * @param {object} httpsOptions - Configuration for HTTPS
 * @param {string} httpsOptions.privateKey - Private Key File
 * @param {string} httpsOptions.certificate - Certificate File
 * @param {object} options - Configuration options for server
 * @param {string} options.views - Folder for application views
 * @param {string} options.viewEngine - Express View Engine
 * @param {string} options.static - Folder to server static files from
 * @param {object} options.session - Configuration for express-session
 * @param {boolean} options.session.use - Use express-session?
 * @param {string} options.session.name - Name for session
 * @param {string} options.session.secret - Session secret
 * @param {boolean} options.session.resave - Resave Session
 * @param {boolean} options.session.saveUninitialized - Save Uninitialized
 * @param {Function} options.authFunction - Function for authentication, if null secured routes will error
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
module.exports.https = function(routes, httpsPort, httpsOptions, options) {
  const express = require("express")();
  require("./lib/middleware.js")(express, options);
  require("./lib/route.js")(express, require(routes), options.authFunction);
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