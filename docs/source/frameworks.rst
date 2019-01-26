Supported Frameworks
=====================

Framework Agnostic
--------------------

| Return Dictionary of Headers: 
| ``secureHeaders.headers()``


**Example:**

.. code:: javascript

  const secureHeaders = new blockade.SecureHeaders({ csp: true, feature: true });
  return secureHeaders.headers()

**Return Value:**

.. code:: json

  { 
    'Strict-Transport-Security': 'max-age=63072000; includeSubdomains',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "script-src 'self'; object-src 'self'",
    'Referrer-Policy': 'no-referrer, strict-origin-when-cross-origin',
    Pragma: 'no-cache',
    Expires: '0',
    'Cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
    'Feature-Policy':
     "accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; camera 'none'; encrypted-media 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; vr 'none'"
  }


AdonisJs
--------

Headers
~~~~~~~~

``secureHeaders.adonis(response)``


**Example:**

.. code:: javascript

  const blockade = require("blockade");
  const secureHeaders = new blockade.SecureHeaders();

  class Blockade {
    async handle({ response }, next) {
      secureHeaders.adonis(response);
      await next();
    }
  }
  module.exports = Blockade;


Cookies
~~~~~~~~

Coookies
~~~~~~~~

``ecureCookie.adonis(response, name, value)``


**Example:**

.. code:: javascript

  const blockade = require("blockade");
  const secureCookie = new blockade.SecureCookie();

  . . . 

  Route.get("/blockade", ({ response }) => {
    secureCookie.adonis(response, "foo", "bar");
    response.send("Blockade");
  });

  . . . 

Express
--------

Headers
~~~~~~~~

``secureHeaders.express(res)``


**Example:**

.. code:: javascript

  const express = require("express");
  const blockade = require("blockade");
  const app = express();
  const port = 3000;

  const secureHeaders = new blockade.SecureHeaders();
  . . . 

  app.use(function(req, res, next) {
    secureHeaders.express(res);
    next();
  });
      
  . . . 

Cookies
~~~~~~~~

``secureCookie.express(res, name, value)``


**Example:**

.. code:: javascript

  const express = require("express");
  const blockade = require("blockade");
  const app = express();
  const port = 3000;

  const secureCookie = new blockade.SecureCookie();

  . . . 

  app.get("/blockade", function(req, res) {
    secureCookie.express(res, "foo", "bar");
    res.send("blockade");
  });
        
  . . . 

Fastify
--------

Headers
~~~~~~~~

``secureHeaders.fastify(reply)``


**Example:**

.. code:: javascript

  const fastify = require("fastify")();

  const blockade = require("blockade");
  const secureHeaders = new blockade.SecureHeaders();

  . . . 

  fastify.addHook("preHandler", async (request, reply) => {
    secureHeaders.fastify(reply);
  });
      
  . . . 

Cookies
~~~~~~~~

``secureCookie.fastify(reply, name, value)``


**Example:**

.. code:: javascript

  const fastify = require("fastify")();

  const blockade = require("blockade");
  const secureCookie = new blockade.SecureCookie();

  . . . 

  fastify.get("/", function(request, reply) {
    secureCookie.fastify(reply, "foo", "bar");
    reply.send({ blockade: true });
  });
          
  . . . 

hapi
------

Headers
~~~~~~~

``secureHeaders.hapi(response)``


**Example:**

.. code:: javascript

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

Cookies
~~~~~~~~

``secureCookie.hapi(h, name, value)``


**Example:**

.. code:: javascript

  const Hapi = require("hapi");
  const blockade = require("blockade");

  const secureCookie = new blockade.SecureCookie();

  . . . 

  server.route({
    method: "GET",
    path: "/blockade",
    handler: function(request, h) {
      secureCookie.hapi(h, "foo", "bar");
      const response = h.response("blockade");
      return response;
    }
  });

  . . . 


Koa
--------

Headers
~~~~~~~

``secureHeaders.koa(ctx)``


**Example:**

.. code:: javascript

  const Koa = require("koa");
  const blockade = require("blockade");

  const secureHeaders = new blockade.SecureHeaders();
  . . . 

  app.use(async (ctx, next) => {
    await next();
    secureHeaders.koa(ctx);
  });
      
  . . . 

Cookies
~~~~~~~~

``secureCookie.koa(ctx, name, value)``


**Example:**

.. code:: javascript

  const Koa = require("koa");
  const app = new Koa();
  const blockade = require("blockade");

  const secureCookie = new blockade.SecureCookie();

  . . . 

  app.use(async ctx => {
    ctx.body = "Blockade";
    secureCookie.koa(ctx, "foo", "bar");
  });

  . . . 

Meteor
--------

Headers
~~~~~~~

``secureHeaders.meteor(res)``


**Example:**

.. code:: javascript

  import { Meteor } from "meteor/meteor";
  import { SecureHeaders } from "blockade";

  const secureHeaders = new SecureHeaders({});

  var connectHandler = WebApp.connectHandlers;

  Meteor.startup(function() {
    connectHandler.use(function(req, res, next) {
      secureHeaders.meteor(res);
      return next();
    });
  });
      
  . . . 

Cookies
~~~~~~~~

Meteor does not support cookies naively, please see `https://atmospherejs.com/?q=cookie <https://atmospherejs.com/?q=cookie>`__ for cookie support packages. 


Nest
--------

Headers
~~~~~~~

``secureHeaders.nest(res)``


**Example:**

.. code:: javascript

  import { SecureHeaders } from 'blockade';

  const secureHeaders = new SecureHeaders({});

  export function blockade(req, res, next) {
    secureHeaders.nest(res);
    next();
  }


Cookies
~~~~~~~~

``secureCookie.nest(res, name, value)``


**Example:**

.. code:: javascript

  import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
  import { AppService } from './app.service';
  import { SecureCookie, SameSite } from 'blockade';
  const secureCookie = new SecureCookie({});

  @Controller()
  export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('blockade')
    getHello(@Res() res): string {
      secureCookie.nest(res, 'foo', 'bar');
      return res.status(HttpStatus.OK).json([]);
    }
  }

Polka
--------

Headers
~~~~~~~

``secureHeaders.polka(res)``


**Example:**

.. code:: javascript

  const polka = require("polka");
  const blockade = require("blockade");
  const secureHeaders = new blockade.SecureHeaders();

  function headers(req, res, next) {
    secureHeaders.polka(res);
    next();
  }

  polka()
    .use(headers)
    .get("/", (req, res) => {
      res.end(`Blockade`);
    })
    .listen(3000, err => {
      if (err) throw err;
      console.log(`> Running on localhost:3000`);
    });



Cookies
~~~~~~~~

``secureCookie.polka(res, name, value)``


**Example:**

.. code:: javascript

  const polka = require("polka");
  const blockade = require("blockade");
  const secureCookie = new blockade.SecureCookie();

  polka()
    .get("/", (req, res) => {
      secureCookie.polka(res, "foo", "bar");
      res.end(`Blockade`);
    })
    .listen(3000, err => {
      if (err) throw err;
      console.log(`> Running on localhost:3000`);
    });


restify
--------

Headers
~~~~~~~

``secureHeaders.restify(res)``


**Example:**

.. code:: javascript

  var restify = require("restify");
  const blockade = require("blockade");
  const secureHeaders = new blockade.SecureHeaders();

  function respond(req, res, next) {
    res.send("Blockade");
    next();
  }

  function headers(req, res, next) {
    secureHeaders.restify(res);
    next();
  }

  . . . 

  var server = restify.createServer();
  server.pre(headers);
  server.get("/", respond);

Cookies
~~~~~~~~

``secureCookie.restify(res, name, value)``


**Example:**

.. code:: javascript

  var restify = require("restify");
  const blockade = require("blockade");
  const secureCookie = new blockade.SecureCookie();

  function respond(req, res, next) {
    secureCookie.restify(res, "foo", "bar");
    res.send("Blockade");
    next();
  }

  . . . 

  var server = restify.createServer();
  server.get("/", respond);


Sails
--------

Headers
~~~~~~~

``secureHeaders.sails(res)``


**Example:**

.. code:: javascript

  const blockade = require("blockade");
  const secureHeaders = new blockade.SecureHeaders();

  module.exports.http = {
    middleware: {
      order: ["blockade"],

      blockade: (function() {
        return function(req, res, next) {
          secureHeaders.sails(res);
          return next();
        };
      })()
    }
  };

Cookies
~~~~~~~~

``secureCookie.sails(res, name, value)``


**Example:**

.. code:: javascript

  const blockade = require("blockade");
  const secureCookie = new blockade.SecureCookie();

  module.exports = {
    blockade: function(req, res) {
      secureCookie.sails(res, "foo", "bar");
      return res.send("Blockade");
    }
  };


Total.js
---------

Headers
~~~~~~~

``secureHeaders.total(response)``


**Example:**

.. code:: javascript

  const blockade = require("blockade");
  const secureHeaders = new blockade.SecureHeaders();

  exports.install = function() {
    ROUTE("/", view_index);
  };

  function view_index() {
    var response = this;
    secureHeaders.total(response);
    response.view("index");
  }

Cookies
~~~~~~~~

``secureCookie.total(response, name, value)``


**Example:**

.. code:: javascript

  const blockade = require("blockade");
  const secureCookie = new blockade.SecureCookie();

  exports.install = function() {
    ROUTE("/", view_index);
  };

  function view_index() {
    var response = this;
    secureCookie.total(response, "foo", "bar");
    response.view("index");
  }