module.exports = [{
  path: "/",
  method: "get",
  secured: true,
  data: function(req, res) {
    res.send("Success");
  }
}, {
  path: "/hello",
  method: "get",
  secured: true,
  data: function(req, res) {
    res.send("Hello");
  }
}, {
  path: "/test",
  method: "get",
  data: function(req, res) {
    res.render("test", {
      agent: JSON.stringify(req.headers)
    });
  }
}];