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

  - Use [configuration node](http://nodered.org/docs/creating-nodes/config-nodes.html) to store Librato credentials
  - Add support for [configuring the period](https://github.com/goodeggs/librato-node#advanced)
  - Add support for [measuring durations](https://github.com/goodeggs/librato-node#timing)
