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
| middlewareOptions | <code>object</code> | Configuration options for middleware |
| middlewareOptions.views | <code>string</code> | Folder for application views |
| middlewareOptions.viewEngine | <code>string</code> | Express View Engine |
| middlewareOptions.static | <code>string</code> | Folder to server static files from |
| middlewareOptions.session | <code>boolean</code> | Use express-session |
| sessionOptions | <code>Object</code> | Configuration for session |
| sessionOptions.cookie | <code>Object</code> | Object for configuring session cookie |
| sessionOptions.cookie.domain | <code>string</code> | Domain the cookie applies to |
| sessionOptions.cookie.expires | <code>Date</code> | Date the cookie expires |
| sessionOptions.cookie.httpOnly | <code>boolean</code> | If true, confines cookie to HTTP request only |
| sessionOptions.cookie.maxAge | <code>number</code> | Time session is valid in milliseconds |
| sessionOptions.cookie.path | <code>string</code> | Path that cookie is active on |
| sessionOptions.cookie.sameSite | <code>boolean</code> \| <code>string</code> | Sets value for SameSite Attribute, see express-session for more details |
| sessionOptions.cookie.secure | <code>boolean</code> | If true cookie will only be sent over HTTPS |
| sessionOptions.name | <code>string</code> | Name of session ID cookie |
| sessionOptions.proxy | <code>boolean</code> | Is proxy trusted |
| sessionOptions.resave | <code>boolean</code> | Saves session even if not modified |
| sessionOptions.rolling | <code>boolean</code> | If true forces session identifier to be set on each response |
| sessionOptions.saveUninitialized | <code>boolean</code> | Saves session when new and not modified |
| sessionOptions.secret | <code>string</code> \| <code>Array.&lt;Object&gt;</code> | Secret to secure session |
| sessionOptions.unset | <code>string</code> | What to do when session is unset |
| sessionOptions.store | <code>Object</code> | Object to configure MySQL Session storage |
| sessionOptions.store.host | <code>string</code> | Host name for database connection |
| sessionOptions.store.port | <code>number</code> | Port number for database connection |
| sessionOptions.store.user | <code>string</code> | Database user |
| sessionOptions.store.password | <code>string</code> | Password for the above database user |
| sessionOptions.store.database | <code>string</code> | Database name |
| sessionOptions.store.clearExpired | <code>boolean</code> | Whether or not to automatically check for and clear expired sessions |
| sessionOptions.store.checkExpirationInterval | <code>number</code> | How frequently expired sessions will be cleared; milliseconds |
| sessionOptions.store.expiration | <code>number</code> | The maximum age of a valid session; milliseconds |
| sessionOptions.store.createDatabaseTable | <code>boolean</code> | Whether or not to create the sessions database table, if one does not already exist |
| sessionOptions.store.connectionLimit | <code>number</code> | Number of connections when creating a connection pool |
| sessionOptions.store.endConnectionOnClose | <code>boolean</code> | Whether or not to end the database connection when the store is closed |
| sessionOptions.store.charset | <code>string</code> | Charset of database |
| sessionOptions.store.schema | <code>Object</code> | Schema for database |
| sessionOptions.store.schema.tableName | <code>sring</code> | Name of database table |
| sessionOptions.store.schema.columnNames | <code>Object</code> | Name of columns in the database table |
| sessionOptions.store.schema.columnNames.session_id | <code>string</code> | Name of session id column |
| sessionOptions.store.schema.columnNames.expires | <code>string</code> | Name of expriation column |
| sessionOptions.store.schema.columnNames.data | <code>string</code> | Name of data column |
| authFunction | <code>function</code> | Function for authentication, if null secured routes will error |

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
| middlewareOptions | <code>object</code> | Configuration options for server |
| middlewareOptions.views | <code>string</code> | Folder for application views |
| middlewareOptions.viewEngine | <code>string</code> | Express View Engine |
| middlewareOptions.static | <code>string</code> | Folder to server static files from |
| middlewareOptions.session | <code>boolean</code> | Use express-session? |
| sessionOptions | <code>Object</code> | Configuration for session |
| sessionOptions.cookie | <code>Object</code> | Object for configuring session cookie |
| sessionOptions.cookie.domain | <code>string</code> | Domain the cookie applies to |
| sessionOptions.cookie.expires | <code>Date</code> | Date the cookie expires |
| sessionOptions.cookie.httpOnly | <code>boolean</code> | If true, confines cookie to HTTP request only |
| sessionOptions.cookie.maxAge | <code>number</code> | Time session is valid in milliseconds |
| sessionOptions.cookie.path | <code>string</code> | Path that cookie is active on |
| sessionOptions.cookie.sameSite | <code>boolean</code> \| <code>string</code> | Sets value for SameSite Attribute, see express-session for more details |
| sessionOptions.cookie.secure | <code>boolean</code> | If true cookie will only be sent over HTTPS |
| sessionOptions.name | <code>string</code> | Name of session ID cookie |
| sessionOptions.proxy | <code>boolean</code> | Is proxy trusted |
| sessionOptions.resave | <code>boolean</code> | Saves session even if not modified |
| sessionOptions.rolling | <code>boolean</code> | If true forces session identifier to be set on each response |
| sessionOptions.saveUninitialized | <code>boolean</code> | Saves session when new and not modified |
| sessionOptions.secret | <code>string</code> \| <code>Array.&lt;Object&gt;</code> | Secret to secure session |
| sessionOptions.unset | <code>string</code> | What to do when session is unset |
| sessionOptions.store | <code>Object</code> | Object to configure MySQL Session storage |
| sessionOptions.store.host | <code>string</code> | Host name for database connection |
| sessionOptions.store.port | <code>number</code> | Port number for database connection |
| sessionOptions.store.user | <code>string</code> | Database user |
| sessionOptions.store.password | <code>string</code> | Password for the above database user |
| sessionOptions.store.database | <code>string</code> | Database name |
| sessionOptions.store.clearExpired | <code>boolean</code> | Whether or not to automatically check for and clear expired sessions |
| sessionOptions.store.checkExpirationInterval | <code>number</code> | How frequently expired sessions will be cleared; milliseconds |
| sessionOptions.store.expiration | <code>number</code> | The maximum age of a valid session; milliseconds |
| sessionOptions.store.createDatabaseTable | <code>boolean</code> | Whether or not to create the sessions database table, if one does not already exist |
| sessionOptions.store.connectionLimit | <code>number</code> | Number of connections when creating a connection pool |
| sessionOptions.store.endConnectionOnClose | <code>boolean</code> | Whether or not to end the database connection when the store is closed |
| sessionOptions.store.charset | <code>string</code> | Charset of database |
| sessionOptions.store.schema | <code>Object</code> | Schema for database |
| sessionOptions.store.schema.tableName | <code>sring</code> | Name of database table |
| sessionOptions.store.schema.columnNames | <code>Object</code> | Name of columns in the database table |
| sessionOptions.store.schema.columnNames.session_id | <code>string</code> | Name of session id column |
| sessionOptions.store.schema.columnNames.expires | <code>string</code> | Name of expriation column |
| sessionOptions.store.schema.columnNames.data | <code>string</code> | Name of data column |
| authFunction | <code>function</code> | Function for authentication, if null secured routes will error |

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
