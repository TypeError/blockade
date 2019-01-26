Secure Headers
----------------

Security Headers are HTTP response headers that, when set, can enhance
the security of your web application by enabling browser security
policies.

You can assess the security of your HTTP response headers at
`securityheaders.com <https://securityheaders.com>`__

*Recommendations used by secure,py and more information regarding
security headers can be found at the* `OWASP Secure Headers
Project <https://www.owasp.org/index.php/OWASP_Secure_Headers_Project>`__ *.*

Server
^^^^^^^^^^^^^^

| Contain information about server software
| **Default Value:** ``NULL`` *(obfuscate server information, not
  included by default)*

Strict-Transport-Security (HSTS)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Ensure application communication is sent over HTTPS
| **Default Value:** ``max-age=63072000; includeSubdomains``

X-Frame-Options (XFO)
^^^^^^^^^^^^^^^^^^^^^^

| Disable framing from different origins (clickjacking defense)
| **Default Value:** ``SAMEORIGIN``

X-XSS-Protection
^^^^^^^^^^^^^^^^^^

| Enable browser cross-site scripting filters
| **Default Value:** ``1; mode=block``

X-Content-Type-Options
^^^^^^^^^^^^^^^^^^^^^^^

| Prevent MIME-sniffing
| **Default Value:** ``nosniff``

Content-Security-Policy (CSP)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Prevent cross-site injections
| **Default Value:** ``script-src 'self'; object-src 'self'`` *(not
  included by default)*\*

Referrer-Policy
^^^^^^^^^^^^^^^^

| Enable full referrer if same origin, remove path for cross origin and
  disable referrer in unsupported browsers
| **Default Value:** ``no-referrer, strict-origin-when-cross-origin``

Cache-control / Pragma / Expires
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Prevent cacheable HTTPS response
| **Default Value:** ``no-cache, no-store, must-revalidate, max-age=0``
  / ``no-cache`` / ``0``

Feature-Policy
^^^^^^^^^^^^^^^

| Disable browser features and APIs
| **Default Value:**
  ``accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; camera 'none'; encrypted-media 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; vr 'none';``
  *(not included by default)*    


Additional information
^^^^^^^^^^^^^^^^^^^^^^^^
  - The ``Strict-Transport-Security`` (HSTS) header will tell the browser to **only** utilize secure HTTPS connections for the domain, and in the default configuration, including all subdomains. The HSTS header requires trusted certificates and users will unable to connect to the site if using self-signed or expired certificates.  The browser will honor the HSTS header for the time directed in the ``max-age`` attribute *(default = 2 years)*, and setting the ``max-age`` to ``0`` will disable an already set HSTS header. Use the ``{ hsts: false }`` option to not include the HSTS header in Secure Headers.
  - The ``Content-Security-Policy`` (CSP) header can break functionality and can (and should) be carefully constructed, use the ``{ csp : true }`` option to enable default values.

Usage
^^^^^^^

.. code:: javascript

  const secureHeaders = new blockade.SecureHeaders();
  secureHeaders.framework(response);


**Default HTTP response headers:**

.. code:: http

  Strict-Transport-Security: max-age=63072000; includeSubdomains
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer, strict-origin-when-cross-origin
  Cache-control: no-cache, no-store, must-revalidate, max-age=0
  Pragma: no-cache
  Expires: 0

Options
^^^^^^^^

You can toggle the setting of headers with default values by passing an object with ``new blockade.Header().default()`` or ``new blockade.Header().notSet()`` and override default values by passing ``new blockade.Header().set("custom")`` or  policy to the following options: 

-  ``server`` - set the Server header, e.g. ``new blockade.Server().set("Blockade")``
   - (default= ``default=Server().notSet()`` )
-  ``hsts`` - set the Strict-Transport-Security header - (default= ``HSTS().default()`` )
-  ``xfo`` - set the X-Frame-Options header - (default= ``XFO().default()`` )
-  ``xxp`` - set the X-XSS-Protection header - (default= ``XXP().default()`` )
-  ``content`` - set the X-Content-Type-Options header - (default= ``Content().default()`` )
-  ``csp`` - set the Content-Security-Policy - (default= ``CSP().notSet()`` )
-  ``referrer`` - set the Referrer-Policy header - (default= ``Referrer().default()`` )
-  ``cache`` - set the Cache-control and Pragma headers - (default= ``Cache().default()`` )
-  ``feature`` - set the Feature-Policy header - (default= ``Feature().notSet()`` )


**Example:**

.. code:: javascript

  const blockade = require("blockade");

  const secureHeaders = new blockade.SecureHeaders({
    server: "Blockade",
    csp: true,
    hsts: false
  });

  . . . 

  secureHeaders.framework(response)

    . . . 

