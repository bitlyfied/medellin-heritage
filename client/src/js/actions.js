'use strict';

var Reflux = require('Reflux');

var _actions = [
  'search', 
  'filter',
  'showMapView',
  'showListView'
];

module.exports = Reflux.createActions(_actions);

