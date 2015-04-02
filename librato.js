/*
The MIT License (MIT)

Copyright (c) 2015 Geoffrey Arnold

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

module.exports = function(RED) {
    'use strict';

    function LibratoConfigNode(n) {
        RED.nodes.createNode(this, n);
        this.email = n.email;
        this.token = n.token;

        this.client = require('librato-node');
        this.client.configure({
            email: this.email,
            token: this.token
        });

        this.log('Starting Librato client [' + this.email + ']');
        this.client.start();

        var node = this;

        this.on('close', function() {
            node.log('Stopping Librato client');
            node.client.stop();
        });
    }
    RED.nodes.registerType('librato-config', LibratoConfigNode);

    function LibratoNode(n) {
        RED.nodes.createNode(this, n);
        this.librato = RED.nodes.getNode(n.librato);
        this.metricName = n.metricName;
        this.metricType = n.metricType || 'gauge';

        var node = this;

        this.on('input', function(msg) {
            var value = Number(msg.payload || 0);

            if (isNaN(value)) {
                node.warn('Payload is NaN [' + msg.payload + ']');
            } else if (node.librato) {
                if (node.metricType == 'gauge') {
                    node.librato.client.measure(node.metricName, value);
                } else {
                    if (value) {
                        node.librato.client.increment(node.metricName, value);
                    } else {
                        node.librato.client.increment(node.metricName);
                    }
                }
            } else {
                node.error('Librato client is not configured');
            }
        });
    }
    RED.nodes.registerType('librato', LibratoNode);
}
