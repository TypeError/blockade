# Blockade

[![version](https://img.shields.io/npm/v/blockade.svg)](https://www.npmjs.com/package/blockade)
[![Types](https://img.shields.io/npm/types/blockade.svg)](https://www.npmjs.com/package/blockade)
[![License](https://img.shields.io/npm/l/blockade.svg)](https://www.npmjs.com/package/blockade)
[![Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Blockade ⚓️ is a lightweight package that adds optional security headers and cookie attributes for Node.js web frameworks.

Security HTTP headers and cookie attributes help enhance the security of your web application by enabling built-in browser security mechanisms. 

### Supported Node.js web frameworks:
[AdonisJs](https://adonisjs.com), [Express](https://expressjs.com), [Fastify](https://www.fastify.io), [hapi](https://hapijs.com), [Koa](https://koajs.com), [Meteor](https://www.meteor.com), [Nest](https://nestjs.com), [Polka](https://github.com/lukeed/polka), [restify](http://restify.com), [Sails](https://sailsjs.com), [Total.js](https://www.totaljs.com)

## Install

```console
$ npm i blockade
```

After installing Blockade:

```javascript
const blockade = require("blockade");

const secureHeaders = new blockade.SecureHeaders();
const secureCookie = new blockade.SecureCookie();

```


## Secure Headers
 
 ### Example
`secureHeaders.framework(response);`

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

## Secure Cookie

### Example

```javascript
secureCookie.framework(response, "foo", "bar");
```

**Default Set-Cookie HTTP response header:**   

```HTTP
Set-Cookie: foo=bar; Path=/; secure; HttpOnly; SameSite=lax
```

## Documentation
Please see the full set of documentation at [https://blockadejs.readthedocs.io](https://blockadejs.readthedocs.io)

## Resources
- [OWASP - Secure Headers Project](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project)
- [OWASP - Session Management Cheat Sheet](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet#Cookies)
- [Mozilla Web Security](https://infosec.mozilla.org/guidelines/web_security)
- [securityheaders.com](https://securityheaders.com)
