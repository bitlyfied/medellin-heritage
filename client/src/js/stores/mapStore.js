'use strict';

var Reflux = require('reflux');
var _      = require('lodash');

var _heritageData = [
  { title: 'Sistine Chapel', artist: 'Michelangelo' },
  { title: 'David', artist: 'Michelangelo' },
  { title: 'Water Lily Pond', artist: 'Monet' },
  { title: 'The Magpie', artist: 'Monet' }
];

var MapStore = Reflux.createStore({
  getHeritageItems: function () {
    return _heritageData;
  },

  getTitles: function () {
    return _.pluck(_heritageData, 'title');
  },

  getArtists: function () {
    return _.chain(_heritageData)
      .pluck('artist')
      .uniq()
      .value();
  }
});

module.exports = MapStore;