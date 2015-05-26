'use strict';

var Reflux    = require('reflux');
var _         = require('lodash');
var Actions   = require('../actions');
var SeedData  = require('../seedData').features;
var Constants = require('../constants');

var _heritageCategories = _.chain(SeedData)
  .pluck('properties.Type')
  .uniq()
  .value();

var MapStore = Reflux.createStore({
  listenables: [Actions],

  _searchText: '',

  _activeView: Constants.views.map,

  _selectedCategories: [],

  getSearchText: function () {
    return this._searchText;
  },

  getActiveView: function () {
    return this._activeView;
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

  onShowMapView: function () {
    this._activeView = Constants.views.map;
    this.trigger();
  },

  onShowListView: function () {
    this._activeView = Constants.views.list;
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