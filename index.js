'use strict';

var createInstrumenter = require('istanbul-lib-instrument').createInstrumenter;
var loaderUtils = require('loader-utils');
var assign = require('object-assign');

var defaultOptions = {
    autoWrap: false
    // produceSourceMap: true
};

module.exports = function(source) {
    var userOptions = loaderUtils.parseQuery(this.query);
    var instrumenter = createInstrumenter(
        assign({}, defaultOptions, userOptions)
    );

    if (this.cacheable) {
        this.cacheable();
    }

    return instrumenter.instrumentSync(source, this.resourcePath);
};
