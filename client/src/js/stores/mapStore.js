'use strict';

var Reflux   = require('reflux');
var _        = require('lodash');
var Actions  = require('../actions');
var SeedData = require('../seedData').features;

var MapStore = Reflux.createStore({
  listenables: [Actions],

  _searchText: '',

  _searchFilters: {},

  _selectedFeature: null,

  _heritageCategories: [],

  init: function () {
    this._heritageCategories = _.chain(SeedData)
      .pluck('properties.type')
      .uniq()
      .sortBy()
      .value();
    this._selectAllFilters();
  },


  //EVENT HANDLERS
  onSearch: function (searchText) {
    this._selectedFeature = null;
    this._searchText = searchText.toLowerCase();
    this.trigger();
  },

  onFilter: function (value, isChecked) {
    this._searchFilters[value] = isChecked;
    this.trigger();
  },

  onSelectItem: function (id) {
    this._selectedFeature = _.find(SeedData, function (item) {
      return item.properties.id === id;
    });

    this.trigger();
    Actions.itemSelected(this._selectedFeature);
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

  //ACCESSORS
  getSearchText: function () {
    return this._searchText;
  },

  getFilteredHeritageItems: function () {
    return _.filter(SeedData, function (item) {
      return this._filterBySearchText(item) && this._filterByFilters(item);
    }, this);
  },

  getHeritageCategories: function () {
    return this._heritageCategories;
  },

  getSearchFilters: function () {
    return this._searchFilters;
  },

  getSelectedFeature: function () {
    return this._selectedFeature;
  },


  //BUSINESS RULES
  shouldHideResults: function () {
    var activeFilters = [];
    _.forEach(this._searchFilters, function (val, key) {
      if (val) {
        activeFilters.push(key);
      }
    });
    
    return (!this._isSearchLongEnough() || _.isEmpty(activeFilters) || _.isEmpty(this.getFilteredHeritageItems())) && 
      !this._selectedFeature;
  },

  shouldShowFilters: function () {
    return !this._selectedFeature;
  },

  shouldHideBackToResultsBtn: function () {
    return !this._isSearchLongEnough();
  },


  //PRIVATE
  _filterBySearchText: function (item) {
    var lcTitle = item.properties.title.toLowerCase();
    var lcAuthor = item.properties.author.toLowerCase();

    return _.isEmpty(this._searchText) || 
      lcTitle.indexOf(this._searchText) > -1 || 
      lcAuthor.indexOf(this._searchText) > -1;
  },

  _filterByFilters: function (item) {
    var type = item.properties.type;
    return this._searchFilters[type];
  },

  _selectAllFilters: function () {
    _.forEach(this._heritageCategories, function (filter) {
      this._searchFilters[filter] = true;
    }, this);
  },

  _isSearchLongEnough: function () {
    return !_.isEmpty(this._searchText);
  }
});

module.exports = MapStore;