"use strict";
const bodyParser = require("body-parser");
/**
 * @function
 * @param {Function} express - Express Function
 * @param {object} options - Configuration options for server
 * @param {string} options.views - Folder for application views
 * @param {string} options.viewEngine - Express View Engine
 * @param {string} options.static - Folder to server static files from
 * @param {object} options.session - Configuration for express-session
 * @param {boolean} options.session.use - Use express-session?
 * @param {string} options.session.name - Name for session
 * @param {string} options.session.secret - Sessiosn secret
 * @param {boolean} options.session.resave - Resave Session
 * @param {boolean} options.session.saveUninitialized - Save Uninitialized
 * @param {Function} options.authFunction - Function for authentication, if null secured routes will error
 * @returns {Function} - Express Function
 **/
module.exports = function(express, options) {
  express.set("views", __dirname + "/" + options.views);
  express.set("view engine", options.viewEngine);
  express.use(require("helmet")());
  express.use(require("express").static(options.static));
  express.use(require("express").static("node_modules"));
  express.use(require("cookie-parser")());
  express.use(bodyParser.urlencoded({
    extended: false
  }));
  express.use(bodyParser.json());
  if (options.session.use === true) {
    express.use(require("express-session")({
      name: options.session.name,
      secret: options.session.secret,
      resave: options.session.resave,
      saveUninitialized: options.session.saveUninitialized
    }));
  }
  return express;
};