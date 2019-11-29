"use strict";
const unsecured = require("express").Router();
const secured = require("express").Router();
const error = require("express").Router();
/**
 *@function
 *@param {Function} express - Express.js Function
 *@param {Object} routes - Array of routes for express
 *@returns {Function} - Express.js Function
 **/
module.exports = function(express, routes) {
  routes.forEach(function(route) {
    if (route.secured === true) {
      if (route.page) {
        secured[route.method](route.path, function(request, response) {
          response.render(route.page, route.pageData);
        });
      }
      if (route.data) {
        secured[route.method](route.path, route.data);
      }
    } else {
      if (route.page) {
        unsecured[route.method](route.path, function(request, response) {
          response.render(route.page, route.pageData);
        });
      }
      if (route.data) {
        unsecured[route.method](route.path, route.data);
      }
    }
  });
  express.use(unsecured);
  express.use(secured);
  error.use(function(req, res, next) {
    res.status(404).render("404");
  });
  express.use(error);
  return express;
}