/*
 * tsearch2
 * https://github.com/markselby/node-tsearch2
 *
 * Copyright (c) 2013 Mark Selby
 * Licensed under the MIT license.
 */

'use strict';

var Tsearch2 = function (keywords) {
  var pattern = /!{0,1}\w+(:[a|b|c|d]){0,1}/g;
  this.keywords = keywords.toLowerCase().replace(/\-+/, '!').match(pattern);
};

var p = Tsearch2.prototype;

p.headline = function (fields, options) {
  options = options || {};
  return fields.map(function (field) {
    return "ts_headline(options.config || 'english', " + field + ", query) AS " + field;
  }).join(', ');
};

p.andSearch = function () {
  return this.keywords.join(' & ');
};

p.orSearch = function () {
  return this.keywords.join(' | ');
};

module.exports = Tsearch2;
