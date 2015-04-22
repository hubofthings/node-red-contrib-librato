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
    var os = require('os');

    function LibratoConfigNode(config) {
        RED.nodes.createNode(this, config);
        this.source = config.source || os.hostname();

        this.client = require('librato-metrics').createClient({
            email: config.email,
            token: this.credentials.token
        });
    }
    RED.nodes.registerType('librato-config', LibratoConfigNode, {
        credentials: {
            token: {
                type: 'password'
            }
        }
    });

    function LibratoNode(config) {
        RED.nodes.createNode(this, config);
        this.librato = RED.nodes.getNode(config.librato);
        this.metricName = config.metricName;
        this.metricType = config.metricType || 'gauge';

        var node = this;

        this.on('input', function(msg) {
            var value = Number(msg.payload || 0);

            if (isNaN(value)) {
                node.warn('Payload is NaN [' + msg.payload + ']');
            } else if (node.librato) {
                var metrics = {
                    source: node.librato.source
                };
                metrics[node.metricType + 's'] = [{
                    name: node.metricName,
                    value: value
                }];

                node.librato.client.post('/metrics', metrics, function(error, body) {
                    if (error) {
                        node.warn(error);
                    } else if (body) {
                        node.log(body);
                    }
                });
            } else {
                node.error('Librato client is not configured');
            }
        });
    }
    RED.nodes.registerType('librato', LibratoNode);
}
