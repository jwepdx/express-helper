# Documentation
## Methods
- [http](#)
- [https](#)
- [redirectHttp](#)

## http(routes, httpPort, options)
``` javascript
server.http("./routes.js", 80, {
  views: "views",
  viewEngine: "ejs",
  static: "static",
  session: {
    use: true,
    name: "sessionId",
    secret: "very secret string",
    resave: false,
    saveUninitialized: true
  },
  authFunction: function(req, res, next) {
    next();
  }
});
```
- routes - path to routing file with array
  ```javascript
  module.exports = [{
    path: "/",
    method: "get",
    secured: true,
    data: function(req, res) {
      res.send("Hello");
    }
  }];
  ```
