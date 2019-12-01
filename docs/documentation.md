<a name="module_express-helper"></a>

## express-helper

* [express-helper](#module_express-helper)
    * [~http(routes, httpPort, options)](#module_express-helper..http)
    * [~https(routes, httpsPort, httpsOptions, options)](#module_express-helper..https)
    * [~redirectHttp(redirect)](#module_express-helper..redirectHttp)

<a name="module_express-helper..http"></a>

### express-helper~http(routes, httpPort, options)
**Kind**: inner method of [<code>express-helper</code>](#module_express-helper)  

| Param | Type | Description |
| --- | --- | --- |
| routes | <code>string</code> | Routing Path File (JS file) |
| httpPort | <code>number</code> | Server Port |
| options | <code>object</code> | Configuration options for server |
| options.views | <code>string</code> | Folder for application views |
| options.viewEngine | <code>string</code> | Express View Engine |
| options.static | <code>string</code> | Folder to server static files from |
| options.session | <code>object</code> | Configuration for express-session |
| options.session.use | <code>boolean</code> | Use express-session? |
| options.session.name | <code>string</code> | Name for session |
| options.session.secret | <code>string</code> | Session secret |
| options.session.resave | <code>boolean</code> | Resave Session |
| options.session.saveUninitialized | <code>boolean</code> | Save Uninitialized |
| options.authFunction | <code>function</code> | Function for authentication, if null secured routes will error |

**Example** *(Create a HTTP server on port 80)*  
```js
http("./routes.test.js", 80, {
  views: "views.test",
  viewEngine: "ejs",
  static: "static.test",
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
<a name="module_express-helper..https"></a>

### express-helper~https(routes, httpsPort, httpsOptions, options)
**Kind**: inner method of [<code>express-helper</code>](#module_express-helper)  

| Param | Type | Description |
| --- | --- | --- |
| routes | <code>string</code> | Routing Path File |
| httpsPort | <code>number</code> | Server Port |
| httpsOptions | <code>object</code> | Configuration for HTTPS |
| httpsOptions.privateKey | <code>string</code> | Private Key File |
| httpsOptions.certificate | <code>string</code> | Certificate File |
| options | <code>object</code> | Configuration options for server |
| options.views | <code>string</code> | Folder for application views |
| options.viewEngine | <code>string</code> | Express View Engine |
| options.static | <code>string</code> | Folder to server static files from |
| options.session | <code>object</code> | Configuration for express-session |
| options.session.use | <code>boolean</code> | Use express-session? |
| options.session.name | <code>string</code> | Name for session |
| options.session.secret | <code>string</code> | Session secret |
| options.session.resave | <code>boolean</code> | Resave Session |
| options.session.saveUninitialized | <code>boolean</code> | Save Uninitialized |
| options.authFunction | <code>function</code> | Function for authentication, if null secured routes will error |

**Example** *(Create a HTTPS server on port 443)*  
```js
https("./routes.test.js", 443, {
 privateKey: "./path/to/privateKey",
 certificate: "./path/to/certificate"
}, {
  views: "views.test",
  viewEngine: "ejs",
  static: "static.test",
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
<a name="module_express-helper..redirectHttp"></a>

### express-helper~redirectHttp(redirect)
**Kind**: inner method of [<code>express-helper</code>](#module_express-helper)  

| Param | Type | Description |
| --- | --- | --- |
| redirect | <code>boolean</code> | True to redirect HTTP to HTTPS |

**Example** *(Redirect HTTP to HTTPS)*  
```js
redirectHttp(true);
```
