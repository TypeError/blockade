# Blockade ⚓️

Blockade ⚓️ is a lightweight package that adds optional security headers for Node web frameworks.

### Supported Node.js web frameworks:
[Express](https://expressjs.com), [hapi](https://hapijs.com), [Koa](https://koajs.com)


## Install

```console
$ nom install blockade
```

After installing Blockade:

```javascript
const blockade = require("blockade");

const secureHeaders = new blockade.SecureHeaders();
```

## Security Headers

Security Headers are HTTP response headers that, when set, can enhance the security of your web application by enabling browser security policies. 

You can assess the security of your HTTP response headers at [securityheaders.com](https://securityheaders.com)

*Recommendations used by Secure 🔒 and more information regarding security headers can be found at the [OWASP Secure Headers Project](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project).*
 
## Headers  

#### Server
Contain information about server software   
**Default Value:** `NULL` *(obfuscate server information, not included by default)*

#### Strict-Transport-Security (HSTS)
Ensure application communication is sent over HTTPS   
**Default Value:** `max-age=63072000; includeSubdomains`  
 
#### X-Frame-Options (XFO)
Disable framing from different origins (clickjacking defense)  
**Default Value:** `SAMEORIGIN`  

#### X-XSS-Protection
Enable browser cross-site scripting filters  
**Default Value:** `1; mode=block`  

#### X-Content-Type-Options
Prevent MIME-sniffing  
**Default Value:** `nosniff`  

#### Content-Security-Policy (CSP)
Prevent cross-site injections  
**Default Value:** `script-src 'self'; object-src 'self'`  *(not included by default)**

#### Referrer-Policy
Enable full referrer if same origin, remove path for cross origin and disable referrer in unsupported browsers  
**Default Value:** `no-referrer, strict-origin-when-cross-origin`

#### Cache-control / Pragma / Expires
Prevent cacheable HTTPS response  
**Default Value:** `no-cache, no-store, must-revalidate, max-age=0` / `no-cache` / `0`

#### Feature-Policy
Disable browser features and APIs  
**Default Value:** `accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; camera 'none'; encrypted-media 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; vr 'none';",` *(not included by default)*

### Additional information:
- The `Strict-Transport-Security` (HSTS) header will tell the browser to **only** utilize secure HTTPS connections for the domain, and in the default configuration, including *all* subdomains. The HSTS header requires trusted certificates and users will *unable* to connect to the site if using self-signed or expired certificates. The browser will honor the HSTS header for the time directed in the max-age attribute (default = 2 years), and setting the max-age to 0 will disable an already set HSTS header. Use the `{ hsts: false }` option to not include the HSTS header in Secure Headers.
- The `Content-Security-Policy` (CSP) header can break functionality and can (and should) be carefully constructed, use the `{ csp : true }` option to enable default values.
 
 ### Example
`secureHeaders.framework(response)`

 **Default HTTP response headers:** 
 
```HTTP
Strict-Transport-Security: max-age=63072000; includeSubdomains
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer, strict-origin-when-cross-origin
Cache-control: no-cache, no-store, must-revalidate, max-age=0
Pragma: no-cache
Expires: 0
```

### Options

You can toggle the setting of headers with default values by passing an object with `true` or `false` and override default values by passing a string to the following options:   

- `server` - set the Server header, e.g. `Server=“Secure”` *(string / bool, default=false)*
- `hsts` - set the Strict-Transport-Security header *(string / bool, default=true)*  
- `xfo` - set the X-Frame-Options header *(string / bool, default=true)*  
- `xxp` - set the X-XSS-Protection header *(string / bool, default=true)*  
- `content` - set the X-Content-Type-Options header *(string / bool, default=true)*  
- `csp` - set the Content-Security-Policy *(string / bool, default=false)* *  
- `referrer` - set the Referrer-Policy header *(string / bool, default=true)*  
- `cache` - set the Cache-control and Pragma headers *(string / bool, default=true)*  
- `feature` - set the Feature-Policy header *(string / bool, default=false)*  

####  Example

```javascript
const blockade = require("blockade");

const secureHeaders = new blockade.SecureHeaders({
  server: "Blockade",
  csp: true,
  hsts: false
});

. . . 

secureHeaders.framework(response)

```

 **HTTP response headers:** 
 
```HTTP
Server: Blockade
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Content-Security-Policy: script-src 'self'; object-src 'self'
Referrer-Policy: no-referrer, strict-origin-when-cross-origin
Pragma: no-cache
Expires: 0
Cache-control: no-cache, no-store, must-revalidate, max-age=0
```

# Supported Frameworks

## Express

#### Headers
`secureHeaders.express(res);`

##### Example
```javascript
const express = require("express");
const blockade = require("blockade");

const secureHeaders = new blockade.SecureHeaders();
. . . 

app.use(function(req, res, next) {
  secureHeaders.express(res);
  next();
});
    
. . . 

```

## hapi

#### Headers
`secureHeaders.hapi(response);`

##### Example
```javascript
const Hapi = require("hapi");
const blockade = require("blockade");

const secureHeaders = new blockade.SecureHeaders();
. . . 

server.ext("onPreResponse", (request, h) => {
  const response = request.response;
  secureHeaders.hapi(response);
  return response;
});
    
. . . 

```

## Koa

#### Headers
`secureHeaders.koa(ctx);`

##### Example
```javascript
const Koa = require("koa");
const blockade = require("blockade");

const secureHeaders = new blockade.SecureHeaders();
. . . 

app.use(async (ctx, next) => {
  await next();
  secureHeaders.koa(ctx);
});
    
. . . 

```


## Attribution/References

#### Frameworks
- [Express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node.
- [hapi](https://github.com/hapijs/hapi) - Server Framework  for Node.js
- [Koa.js](https://github.com/koajs) - Next generation web framework for Node.js

#### Resources
- [OWASP - Secure Headers Project](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project)
- [Mozilla Web Security](https://infosec.mozilla.org/guidelines/web_security)
- [securityheaders.com](https://securityheaders.com)