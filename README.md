# Express Helper
[![Build Status](https://travis-ci.com/jwepdx/express-helper.svg?branch=master)](https://travis-ci.com/jwepdx/express-helper)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4df8eb3dc4be4e70921db5e25fbed660)](https://www.codacy.com/manual/jacobwevans21/express-helper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jwepdx/express-helper&amp;utm_campaign=Badge_Grade)
[![NPM Version](https://img.shields.io/npm/v/express-helper.svg)](https://npmjs.org/package/express-helper)
[![NPM Downloads](https://img.shields.io/npm/dm/express-helper.svg)](https://npmjs.org/package/express-helper)

## Installation
``` bash
$ npm install express-helper
```
## Usage
``` javascript
const server = require("express-helper");

server.http("./routes", 80,{
  views: "views",
  viewEngine: "ejs",
  static: "static",
  session: {
    use: true,
    name: "sessionId",
    secret: "unknown string",
    resave: false,
    saveUninitialized: true
  },
  authFunction: function(req, res, next) {
    next();
  }
});
```

## [Documentation](http://jacobwevans.me/express-helper)
