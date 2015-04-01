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

    function LibratoNode(n) {
        RED.nodes.createNode(this, n);
        this.libratoEmail = n.libratoEmail;
        this.libratoToken = n.libratoToken;
        this.metricName = n.metricName;
        this.metricType = n.metricType || 'gauge';

        var node = this;
        var librato = require('librato-node');
        librato.configure({
            email: this.libratoEmail,
            token: this.libratoToken
        });
        librato.start();

        this.on('input', function(msg) {
            var value = msg.payload;

            if (node.metricType == 'gauge') {
                librato.measure(node.metricName, value);
            } else {
                librato.increment(node.metricName, value);
            }
        });

        this.on('close', function() {
            librato.stop();
        });
    }
    RED.nodes.registerType('librato', LibratoNode);
}
