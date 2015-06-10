'use strict';

var Reflux = require('reflux');

var _actions = [
  'search',
  'filter',
  'itemSelect',
  'backToResults',
  'newSearch'
];

module.exports = Reflux.createActions(_actions);

