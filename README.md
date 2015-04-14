node-red-contrib-librato
========================

A [Node-RED](http://nodered.org) node to send metrics to [Librato](https://www.librato.com/).

Install
-------

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-librato

Usage
-----

This node can be connected to the output of any node, and will publish `msg.payload` to Librato.

TODO
----

  - [Queue and periodically flush](http://dev.librato.com/v1/post/metrics) recorded metrics
