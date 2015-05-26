'use strict';

var Reflux = require('reflux');
var _      = require('lodash');
var Actions = require('../actions');
var SeedData = require('../seedData').features;

// var _heritageData = [
//   { title: 'Sistine Chapel', artist: 'Michelangelo' },
//   { title: 'David', artist: 'Michelangelo' },
//   { title: 'Water Lily Pond', artist: 'Monet' },
//   { title: 'The Magpie', artist: 'Monet' }
// ];

var MapStore = Reflux.createStore({
  listenables: [Actions],

  _searchText: '',

  getHeritageItems: function () {
    return SeedData;
  },

  getSearchText: function () {
    return this._searchText;
  },

  // getFilteredHeritageItems: function () {
  //   return _.filter(SeedData, function (item) {
  //     var lcItem = item.Title.toLowerCase();

  //     return lcItem.contains(this._searchText);
  //   }, this);
  // },

  onSearch: function (searchText) {
    this._searchText = searchText.toLowerCase();
    this.trigger();
  },

  getTitles: function () {
    return _.pluck(SeedData, 'properties.Title');
  },

  getArtists: function () {
    return _.chain(SeedData)
      .pluck('properties.Author')
      .uniq()
      .value();
  }
});

module.exports = MapStore;