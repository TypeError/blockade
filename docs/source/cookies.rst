Secure Cookies
-----------------

Path
^^^^^^^

The Path directive instructs the browser to only send the cookie if
provided path exists in the URL.

.. _secure-1:

Secure
^^^^^^^

The Secure flag instructs the browser to only send the cookie via HTTPS.

HttpOnly
^^^^^^^^^

The HttpOnly flag instructs the browser to not allow any client side
code to access the cookie’s contents.

SameSite
^^^^^^^^^

The SameSite flag directs the browser not to include cookies on certain
cross-site requests. There are two values that can be set for the
same-site attribute, lax or strict. The lax value allows the cookie to
be sent via certain cross-site GET requests, but disallows the cookie on
all POST requests. For example cookies are still sent on links
``<a href=“x”>``, prerendering ``<link rel=“prerender” href=“x”`` and
forms sent by GET requests ``<form-method=“get”...``, but cookies will
not be sent via POST requests ``<form-method=“post”...``, images
``<img src=“x”>`` or iframes ``<iframe src=“x”>``. The strict value
prevents the cookie from being sent cross-site in any context. Strict
offers greater security but may impede functionality. This approach
makes authenticated CSRF attacks impossible with the strict flag and
only possible via state changing GET requests with the lax flag.

Expires
^^^^^^^^^

The Expires attribute sets an expiration date for persistent cookies.

.. _example-2:

Usage
^^^^^^^

.. code:: javascript

   secureCookie.framework(response, "foo", "bar");

*Default Set-Cookie HTTP response header:*

.. code:: http

   Set-Cookie: foo=bar; Path=/; secure; HttpOnly; SameSite=lax

.. _options-1:

Options
^^^^^^^^^

You can modify default cookie attribute values by passing the following
options:

-  ``name`` - set the cookie name *(string, No default value)*
-  ``value`` - set the cookie value *(string, No default value)*
-  ``path`` - set the Path attribute, e.g. ``path=“/secure”`` *(string,
   default=“/”)*
-  ``secure`` - set the Secure flag *(bool, default=True)*
-  ``httpOnly`` - set the HttpOnly flag *(bool, default=True)*
-  ``sameSite`` - set the SameSite attribute,
   e.g. ``SameSite.LAX`` *(bool / enum, options:*
   ``blockade.SameSite.Strict``, ``blockade.SameSite.Lax`` *or*
   ``False``, *default=blockade.SameSite.Lax)*
-  ``expires`` - set the Expires attribute with the cookie expiration in
   hours, e.g. ``expires=1`` *(number / bool, default=False)*


.. _example-3:

**Example:**

.. code:: javascript

   const blockade = require("blockade");

   const secureCookie = new blockade.SecureCookie({
     expires: 1,
     sameSite: blockade.SameSite.Strict
   });

   secureCookie.framework(response, "foo", "bar");
