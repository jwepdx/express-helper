"use strict";
const unsecured = require("express").Router();
const secured = require("express").Router();
const error = require("express").Router();

/**
 * @function
 * @param {Function} express - Express.js Function
 * @param {array} routes - Array of routes for express
 * @param {Function} authFunction - Function for authentication
 * @returns {Function} - Express.js Function
 **/
module.exports = function(express, routes, authFunction) {
  routes.forEach(function(route) {
    router(route, authFunction)
  });
  express.use(unsecured);
  express.use(secured);
  error.use(function(req, res, next) {
    res.status(404).render("404");
  });
  express.use(error);
  return express;
};

/**
 * @function
 * @param {Object} route - Object defining page to be routed
 * @param {boolean} route.secured - If page is secured or not
 * @param {string} route.method - HTTP method to access page
 * @param {Function} route.data - Function for processing request
 * @param {Function} authFunction - Function for authentication
 * @returns {Function} - Routers for Express
 **/
function router(route, authFunction) {
  if (route.secured === true) {
    secured[route.method](route.path, authFunction, route.data);
  } else {
    unsecured[route.method](route.path, route.data);
  }
  return unsecured, secured;
};