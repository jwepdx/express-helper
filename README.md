# Express Helper
[![Build Status](https://travis-ci.com/jwepdx/express-helper.svg?branch=master)](https://travis-ci.com/jwepdx/express-helper)
### Installation
``` bash
$ npm install express-helper
```
### Example
``` javascript
const server = require('express-helper');

server.http(require('./routes'), 80);
```

### Documentation
##### server.http(routes, httpPort);
