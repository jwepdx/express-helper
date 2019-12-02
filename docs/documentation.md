## Modules

<dl>
<dt><a href="#module_http">http</a></dt>
<dd><p>Create a HTTP Server</p>
</dd>
<dt><a href="#module_https">https</a></dt>
<dd><p>Create a HTTPS Server</p>
</dd>
<dt><a href="#module_redirectHttp">redirectHttp</a></dt>
<dd><p>Redirect HTTP to HTTPS</p>
</dd>
</dl>

<a name="module_http"></a>

## http
Create a HTTP Server


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
<a name="module_https"></a>

## https
Create a HTTPS Server


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
<a name="module_redirectHttp"></a>

## redirectHttp
Redirect HTTP to HTTPS


| Param | Type | Description |
| --- | --- | --- |
| redirect | <code>boolean</code> | True to redirect HTTP to HTTPS |

**Example** *(Redirect HTTP to HTTPS)*  
```js
redirectHttp(true);
```
