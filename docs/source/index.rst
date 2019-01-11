.. blockade documentation master file, created by
   sphinx-quickstart on Wed Dec 19 05:31:56 2018.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Blockade
==========

|version| |types| |license| |style|

Blockade ⚓️ is a lightweight package that adds optional security headers and cookie attributes for Node.js web frameworks.

Supported Node.js web frameworks:
----------------------------------

`AdonisJs <https://adonisjs.com>`__
`Express <https://expressjs.com>`__, 
`hapi <https://hapijs.com>`__, 
`Koa <https://koajs.com>`__, 
`Meteor <https://www.meteor.com>`__, 
`Nest <https://nestjs.com>`__, 
`Sails <https://sailsjs.com>`__, 
`Total.js <https://www.totaljs.com>`__


Install
-------

.. code:: console

   $ npm i blockade


After installing Blockade:

.. code:: javascript

   const blockade = require("blockade");

   const secureHeaders = new blockade.SecureHeaders();
   const secureCookie = new blockade.SecureCookie();

Documentation
-------------

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   headers
   cookies
   policies
   frameworks
   resources


.. |version| image:: https://img.shields.io/npm/v/blockade.svg
   :target: https://www.npmjs.com/package/blockade
.. |types| image:: https://img.shields.io/npm/types/blockade.svg
   :target: https://www.npmjs.com/package/blockade
.. |license| image:: https://img.shields.io/npm/l/blockade.svg
   :target: https://www.npmjs.com/package/blockade
.. |style| image:: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
   :target: https://github.com/prettier/prettier


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
