"use strict";
const expressjs = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
/**
 * @function
 * @param {Function} express - Express Function
 * @returns {Function} - Express Function
 **/
module.exports = function(express) {
  express.set("views", __dirname + "/views");
  express.set("view engine", "ejs");
  express.use(helmet());
  express.use(expressjs.static("static"));
  express.use(expressjs.static("node_modules"));
  express.use(cookieParser());
  express.use(bodyParser.urlencoded({
    extended: false
  }));
  express.use(bodyParser.json());
  express.use(session({
    name: "sessionId",
    secret: "1h3dju7jjwbrr3i59wrimasmfioroj37wejb7I4JgeuJEjhriwqGdwjbdUNFKwyhwbuEu2vhqh36djds8dh73j",
    resave: false,
    saveUninitialized: true
  }));
  return express;
};