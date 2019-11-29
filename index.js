'use strict';
const express = require("express")();
const route = require('./route.js');
const fs = require('fs');
const http = require('http');
const https = require('https');

/**
 * @function
 * @param {string} routes - Routing Path File
 * @param {number} httpPort - Server Port
 **/
module.exports.http = function(routes, httpPort) {
  require('./middleware.js')(express);
  route(express, require(routes));
  http.createServer(express).listen(httpPort);
}

/**
 * @function
 * @param {string} routes - Routing Path File
 * @param {number} httpsPort - Server Port
 * @param {string} privateKey - Private Key File
 * @param {string} certificate - Certificate File
 **/
module.exports.https = function(routes, httpsPort, privateKey, certificate) {
  require('./middleware.js')(express);
  route(express, require(routes));
  https.createServer({
    key: fs.readFileSync(privateKey, "utf-8"),
    cert: fs.readFileSync(certificate, "utf-8")
  }, express).listen(httpsPort);
}

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