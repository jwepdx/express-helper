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
    if (route.secured === true) {
      secured[route.method](route.path, authFunction, route.data);
    } else {
      unsecured[route.method](route.path, route.data);
    }
    return unsecured, secured;
  });
  express.use(unsecured);
  express.use(secured);
  error.use(function(req, res, next) {
    res.status(404).render("404");
  });
  express.use(error);
  return express;
};