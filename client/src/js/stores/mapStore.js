'use strict';

var Reflux = require('reflux');
var _      = require('lodash');
var Actions = require('../actions');
var SeedData = require('../seedData').features;

var _heritageCategories = _.chain(SeedData)
  .pluck('properties.Type')
  .uniq()
  .sortBy()
  .value();

var MapStore = Reflux.createStore({
  listenables: [Actions],

  _searchText: '',

  _searchFilters: {},

  init: function () {
    _.forEach(_heritageCategories, function (filter) {
      this._searchFilters[filter] = true;
    }, this);
  },

  getSearchText: function () {
    return this._searchText;
  },

  getFilteredHeritageItems: function () {
    return _.filter(SeedData, function (item) {
      return this._filterBySearchText(item) && this._filterByFilters(item);
    }, this);
  },

  onSearch: function (searchText) {
    this._searchText = searchText.toLowerCase();
    this.trigger();
  },

  onFilter: function (value, isChecked) {
    this._searchFilters[value] = isChecked;
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
    return _heritageCategories;
  },

  shouldHideResults: function () {
    return _.isEmpty(this._searchText);
  },

  _filterBySearchText: function (item) {
    var lcTitle = item.properties.Title.toLowerCase();
    var lcAuthor = item.properties.Author.toLowerCase();

    return _.isEmpty(this._searchText) || 
      lcTitle.indexOf(this._searchText) > -1 || 
      lcAuthor.indexOf(this._searchText) > -1;
  },

  _filterByFilters: function (item) {
    var type = item.properties.Type;
    return this._searchFilters[type];
  }
});

module.exports = MapStore;