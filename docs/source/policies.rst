Policy Builder
----------------

CSP()
^^^^^^^

**Directives:** ``baseUri(sources)``, ``blockAllMixedContent()``,
``connectSrc(sources)``, ``defaultSrc(sources)``,
``fontSrc(sources)``, ``formAction(sources)``,
``frameAncestors(sources)``, ``frameSrc(sources)``,
``imgSrc(sources)``, ``manifestSrc(sources)``, ``mediaSrc(sources)``,
``objectSrc(sources)``, ``pluginTypes(types)``,
``reportTo(json_object)``, ``reportUri(uri)``,
``requireSriFor(values)``, ``sandbox(values)``,
``scriptSrc(sources)``, ``styleSrc(sources)``,
``upgradeInsecureRequests()``, ``workerSrc(sources)``

**Example:**

.. code:: javascript

  const cspValue = new blockade.CSP()
    .defaultSrc(blockade.values.none)
    .baseUri(blockade.values.self)
    .blockAllMixedContent()
    .connectSrc(blockade.values.self, "api.spam.com")
    .frameSrc(blockade.values.none)
    .imgSrc(blockade.values, "static.spam.com").value;

  // default-src 'none'; base-uri 'self'; block-all-mixed-content; connect-src 'self' api.spam.com; frame-src 'none'; img-src [object Object] static.spam.com

*You can check the effectiveness of your CSP Policy at the* `CSP
Evaluator <https://csp-evaluator.withgoogle.com>`__

HSTS()
^^^^^^^

**Directives:** ``includeSubDomains()``, ``maxAge(seconds)``,
``preload()``

**Example:**

.. code:: javascript

  const hstsValue = new blockade.HSTS()
    .includeSubdomains()
    .preload()
    .maxAge(blockade.seconds.oneMonth).value;

  // includeSubDomains; preload; max-age=2592000

XXP()
^^^^^^

**Directives:** ``disabled()`` = 0, ``enabled()`` = 1,
``enabledBlock()`` = 1; mode=block, ``enabledReport(uri)`` = 1;
report=uri

**Example:**

.. code:: javascript

   const xxpValue = new blockade.XXP().enabledBlock().value;

  // 1; mode=block

XFO()
^^^^^^

**Directives:** ``allow_from(uri)``, ``deny()``, ``sameorigin()``

**Example:**

.. code:: javascript

   const xfoValue = new blockade.XFO().deny().value;

  // deny

Referrer()
^^^^^^^^^^^

**Directives:** ``noReferrer()``, ``noReferrerWhenDowngrade()``,
``origin()``, ``originWhenCrossOrigin()``, ``sameOrigin()``,
``strictOrigin()``, ``strictOriginWhenCrossOrigin()``,
``unsafeUrl()``

**Example:**

.. code:: javascript

   const referrerValue = new blockade.Referrer().noReferrer().value;

  // no-referrer

Feature()
^^^^^^^^^^

**Directives:** ``accelerometer(allowlist)``,
``ambient_light_sensor(allowlist)``, ``autoplay(allowlist)``,
``camera(allowlist)``, ``document_domain(allowlist)``,
``encrypted_media(allowlist)``, ``fullscreen(allowlist)``,
``geolocation(allowlist)``, ``gyroscope(allowlist)``,
``magnetometer(allowlist)``, ``microphone(allowlist)``,
``midi(allowlist)``, ``payment(allowlist)``,
``picture_in_picture(allowlist)``, ``speaker(allowlist)``,
``sync_xhr(allowlist)``, ``usb(allowlist)``, ``Values(allowlist)``,
``vr(allowlist)``

**Example:**

.. code:: javascript

  const featureValue = new blockade.Feature()
    .geolocation(blockade.values.self, "spam.com")
    .vibrate(blockade.values.none).value;

  // geolocation 'self' spam.com; vibrate 'none'

Cache()
^^^^^^^^

**Directives:** ``immutable()``, ``maxAge(seconds)``,
``maxStale(seconds)``, ``minFresh(seconds)``, ``mustRevalidate()``,
``noCache()``, ``noStore()``, ``noTransform()``,
``only_if_cached()``, ``private()``, ``proxyRevalidate()``,
``public()``, ``sMaxage(seconds)``, ``staleIfError(seconds)``,
``staleWhileRevalidate(seconds)``,

**Example:**

.. code:: javascript

 const cacheValue = new blockade.Cache()
  .noStore()
  .mustRevalidate()
  .proxyRevalidate().value;

  // no-store, must-revalidate, proxy-revalidate

seconds
^^^^^^^

**Values:** ``fiveMinutes`` = “300”, ``oneWeek`` = “604800”,
``oneMonth`` = “2592000”, ``oneYear`` = “31536000”, ``twoYears`` =
“63072000”

values
^^^^^^^

**Values:** ``all`` = "*", ``none`` = "'none'", ``self`` = "'self'", ``src`` = "'src'", ``strictDynamic`` = "'strict-dynamic'", ``unsafeEval`` = "'unsafe-eval'", ``unsafeInline`` = "'unsafe-inline'"

Usage
^^^^^^

.. _example-1:

**Example:**

.. code:: javascript

  const express = require("express");
  const blockade = require("blockade");
  const app = express();
  const port = 3000;

  const cspValue = new blockade.CSP()
    .defaultSrc(blockade.values.none)
    .baseUri(blockade.values.self)
    .blockAllMixedContent()
    .connectSrc(blockade.values.self, "api.spam.com")
    .frameSrc(blockade.values.none)
    .imgSrc(blockade.values, "static.spam.com").value;

  const hstsValue = new blockade.HSTS()
    .includeSubdomains()
    .preload()
    .maxAge(blockade.seconds.oneMonth).value;

  const xxpValue = new blockade.XXP().enabledBlock().value;

  const xfoValue = new blockade.XFO().deny().value;

  const referrerValue = new blockade.Referrer().noReferrer().value;

  const featureValue = new blockade.Feature()
    .geolocation(blockade.values.self, "spam.com")
    .vibrate(blockade.values.none).value;

  const cacheValue = new blockade.Cache()
    .noStore()
    .mustRevalidate()
    .proxyRevalidate().value;

  const secureHeaders = new blockade.SecureHeaders({
    csp: cspValue,
    hsts: hstsValue,
    xxp: xxpValue,
    xfo: xfoValue,
    referrer: referrerValue,
    feature: featureValue,
    cache: cacheValue
  });

  app.use(function(req, res, next) {
    secureHeaders.express(res);
    next();
  });

  ...


Response Headers:

.. code:: http

  Strict-Transport-Security: includeSubDomains; preload; max-age=2592000
  X-Frame-Options: deny
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Content-Security-Policy: default-src 'none'; base-uri 'self'; block-all-mixed-content; connect-src 'self' api.spam.com; frame-src 'none'; img-src [object Object] static.spam.com
  Referrer-Policy: no-referrer
  Cache-control: no-store, must-revalidate, proxy-revalidate
  Feature-Policy: geolocation 'self' spam.com; vibrate 'none'


