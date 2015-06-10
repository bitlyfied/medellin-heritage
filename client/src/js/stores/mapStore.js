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

  _selectedFeature: null,

  init: function () {
    this._selectAllFilters();
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
    this._selectedFeature = null;
    this._searchText = searchText.toLowerCase();
    this.trigger();
  },

  onFilter: function (value, isChecked) {
    this._searchFilters[value] = isChecked;
    this.trigger();
  },

  onItemSelect: function (feature) {
    this._selectedFeature = feature;
    this.trigger();
  },

  onBackToResults: function () {
    this._selectedFeature = null;
    this.trigger();
  },

  onNewSearch: function () {
    this._selectedFeature = null;
    this._searchText = '';
    this._selectAllFilters();
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

  getSelectedHeritageCategories: function () {
    //HACK For temporary commit
    return _heritageCategories;
    // debugger;
    // return _.where(this._searchFilters, function (a,b,c) {
    //   console.log(a,b,c);
    //   debugger;
    // });
  },

  shouldHideResults: function () {
    return _.isEmpty(this._searchText);
  },

  shouldShowFilters: function () {
    return !this._selectedFeature;
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
  },

  _selectAllFilters: function () {
    _.forEach(_heritageCategories, function (filter) {
      this._searchFilters[filter] = true;
    }, this);
  }
});

module.exports = MapStore;