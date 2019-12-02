const server = require("./../index.js");
server.redirectHttp(true);
server.https(__dirname + "/routes.js", 443, {
  privateKey: __dirname + "/example-keys/private.key",
  certificate: __dirname + "/example-keys/certificate.cert"
}, {
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
    console.log(req);
    res.status(202);
    next();
  }
});