'use strict';

var Reflux = require('Reflux');

var _actions = [
  'search', 
  'filter',
  'toggleView',
];

module.exports = Reflux.createActions(_actions);

