# Change Log

All notable changes to this project will be documented in this file.  This project adheres to [Semantic Versioning](http://semver.org/).

<!-- ## Unreleased -->

## 3.0.0

  - CHANGED: Moved Librato API token out of config node into [credentials](http://nodered.org/docs/creating-nodes/credentials.html).  Token is no longer included when exporting a flow.

## 2.0.0

  - FIXED: [Fixed issue where counters were being recorded as gauges](https://github.com/goodeggs/librato-node/issues/36).  From the [Librato documentation](http://support.metrics.librato.com/knowledgebase/articles/18439-what-are-counters):
  
  > A Librato counter is unbounded (up to 64 bits) and always monotonically increasing in any given run. A new run can be started by restarting the counter's value at zero.

  - FIXED: Removed empty option from metric type selector.

## 1.2.0

  - ADDED: Added support for specifying metric `period` in config node (defaults to 60 seconds).

## 1.1.0

  - ADDED: Added support for specifying metric `source` in config node (defaults to `os.hostname()`).

## 1.0.2

  - FIXED: Default `msg.payload` to 0 when not set.

## 1.0.1

  - FIXED: Log warning when `msg.payload` is not a number.

## 1.0.0

  - Initial cut at a Node-RED node to send metrics to Librato.
