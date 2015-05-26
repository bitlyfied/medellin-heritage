'use strict';

var Reflux = require('reflux');
var _      = require('lodash');
var Actions = require('../actions');

var _heritageData = [
  { title: 'Sistine Chapel', artist: 'Michelangelo' },
  { title: 'David', artist: 'Michelangelo' },
  { title: 'Water Lily Pond', artist: 'Monet' },
  { title: 'The Magpie', artist: 'Monet' }
];

var MapStore = Reflux.createStore({
  listenables: [Actions],

  _searchText: '',

  getHeritageItems: function () {
    return _heritageData;
  },

  onSearch: function (searchText) {
    this._searchText = searchText;
    this.trigger();
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