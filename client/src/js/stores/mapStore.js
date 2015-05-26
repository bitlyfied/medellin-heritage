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

  onSearch: function (searchText) {
    this._searchText = searchText.toLowerCase();
    this.trigger();
  },

  onFilter: function (categories) {
    this._selectedCategories = categories;
    this.trigger();
  },

  onToggleView: function (viewName) {
    this._activeView = viewName;
    this.trigger();
  },

  getSearchText: function () {
    return this._searchText;
  },

  getActiveView: function () {
    return this._activeView;
  },

  getFilteredHeritageItems: function () {
    return _.filter(SeedData, function (item) {
      return this._filterBySearchText(item) && this._filterByCategories(item);
    }, this);
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
  },

  _filterBySearchText: function (item) {
    var lcItem = item.properties.Title.toLowerCase();

    return _.isEmpty(this._searchText) || lcItem.indexOf(this._searchText) > -1;
  },

  _filterByCategories: function (item) {
    return _.isEmpty(this._selectedCategories) || _.includes(this._selectedCategories, item.properties.Type);
  }
});

module.exports = MapStore;