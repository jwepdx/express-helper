'use strict';
const express = require("express")();
const fs = require('fs');
const http = require('http');
const https = require('https');

/**
 * @function
 * @param {boolean} redirect - True to redirect HTTP to HTTPS
 **/
module.exports.redirectHttp = function(redirect) {
  if (redirect) {
    express.use(require("helmet")());
    express.all("*", function(request, response) {
      if (request.protocol === "http") {
        response.redirect("https://" + request.hostname + req.originalUrl);
      }
    })
    http.createServer(express).listen(80);
  }
}
/**
 * @function
 * @param {Function} routes - Routing Function
 * @param {number} httpPort - Server Port
 **/
module.exports.http = function(route, httpPort) {
  require('./middleware.js')(express);
  route(express);
  http.createServer(express).listen(httpPort);
}

/**
 * @function
 * @param {Function} routes - Routing Function
 * @param {number} httpsPort - Server Port
 * @param {string} privateKey - Private Key File
 * @param {string} certificate - Certificate File
 **/
module.exports.https = function(route, httpsPort, privateKey, certificate) {
  require('./middleware.js')(express);
  route(express);
  https.createServer({
    key: fs.readFileSync(privateKey, "utf-8"),
    cert: fs.readFileSync(certificate, "utf-8")
  }, express).listen(httpsPort);
}