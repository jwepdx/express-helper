# Express Helper
[![Build Status](https://travis-ci.com/jwepdx/express-helper.svg?branch=master)](https://travis-ci.com/jwepdx/express-helper)
### Installation
``` bash
$ npm install express-helper
```
### usage
``` javascript
const server = require('express-helper');

server.http(require('./routes'), 80);
```

### Documentation
#### server.http(routes, httpPort);
- routes - Function containing Express.js routers
- httpPort - Port to run Server
``` javascript
server.http(require('./routes'), 80);
```

#### server.https(routes, httpsPort, privateKey, certificate);
- routes - Function containing Express.js routers
- httpsPort - Port to run Server
- privateKey - File were private key for SSL certificate is located
- certificate - File were SSL certificate is located
``` javascript
server.https(require('./routes'), 443, "path/to/key", "path/to/certificate");
```

#### routes
###### Without Routers
``` javascript
module.exports = function(app){
  app.get('/', function(request, response){
    response.render('home');
  });
}
```
###### With Routers
``` javascript
module.exports = function(app){
  const router = require('express').Router();

  router.get('/', function(request, response){
    response.render('home');
  });

  app.use(router);
}
```

###### Importing Routers
``` javascript
// ./routes
module.exports = function(app){
  app.use(require('./routers/router'));
}

// ./routers/routes
const router = require('express').Router();

router.get('/', function(request, response){
  response.render('home');
});

module.exports = router;
```
