const server = require("./../index.js");
server.http(__dirname + "/routes.js", 80, {
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