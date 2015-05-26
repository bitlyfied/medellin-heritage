'use strict';

var Reflux = require('reflux');
var _      = require('lodash');
var Actions = require('../actions');
var SeedData = require('../seedData').features;

var _heritageCategories = [
  'Sculpture',
  'Painting',
  'Architecture'
];

var MapStore = Reflux.createStore({
  listenables: [Actions],

  _searchText: '',

  _selectedCategories: [],

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

  onFilter: function (categories) {
    this._selectedCategories = categories;
    this.trigger();
  },

  getHeritageItems: function () {
    return SeedData;
  },

  getTitles: function () {
    return _.pluck(SeedData, 'properties.Title');
  },

  getArtists: function () {
    return _.chain(SeedData)
      .pluck('properties.Author')
      .uniq()
      .value();
  },

  getHeritageCategories: function () {
    return _.sortBy(_heritageCategories);
  }
});

module.exports = MapStore;