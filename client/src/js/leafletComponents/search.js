'use strict';

var _ = require('lodash');

/* global L, $ */
var items = require('../seedData').features;

var RESULT_ITEM = 'c-search__results__item';

L.Control.Search = L.Control.extend({
  initialize: function (options) {
    L.Util.setOptions(this, options);

    this._searchText = '';
    this._searchFilters = {};
    _.forEach(this.options.filters, function (filter) {
      this._searchFilters[filter] = true;
    }, this);
  },

  onAdd: function (map) {
    var container = this._createContainer(map);
    this._createSearch();
    this._createFilters();
    this._createResults();

    return container;
  },

  _createContainer: function (map) {
    var mapContainer = map.getContainer();
    var className = 'c-search-container';
    var container = this._container = L.DomUtil.create('div', className, mapContainer);

    var stop = L.DomEvent.stopPropagation;
    L.DomEvent
      .on(container, 'click', stop)
      .on(container, 'dblclick', stop)
      .on(container, 'mousedown', stop)
      .on(container, 'touchstart', stop)
      .on(container, 'mousewheel', stop);

    return container;
  },

  _createSearch: function () {
    var searchContainer = L.DomUtil.create('div', 'c-search__search-bar-container', this._container);
    this._searchInput = L.DomUtil.create('input', 'c-search__search-bar', searchContainer);
    L.DomUtil.create('i', 'fa fa-search fa-lg c-search__search-icon', searchContainer);

    var that = this;
    this._searchInput.onkeyup = function (evt) {
      var searchText  = evt.currentTarget.value;
      that._setSearchText(searchText);
    };
  },

  _createFilters: function () {
    var filterContainer = L.DomUtil.create('div', 's-container c-search__filters-container row', this._container);
    var filterTitle = L.DomUtil.create('div', 'c-search__filter-title col-xs-3', filterContainer);
    filterTitle.innerHTML = "Show:";
    var filterListContainer = L.DomUtil.create('div', 'col-xs-9', filterContainer);
    this._filters = L.DomUtil.create('ul', 'c-search__filters', filterListContainer);

    _.forEach(this.options.filters, function (filter) {
      this._createFilter(filter);
    }, this);
  },

  _createFilter: function (filter) {
    var filterElem = L.DomUtil.create('li', 'c-search__filter-item', this._filters);
    filterElem.innerHTML = '<div class="checkbox c-search__filter-item__wrapper">' + 
      '<label>' +
        '<input type="checkbox" class="c-search__filter-item__input" value="' + filter + 
        '" checked="checked">' + filter +
      '</label>' + 
    '</div>';

    var that = this;
    $('.c-search__filter-item__input').change(function (evt) {
      var value = evt.currentTarget.value;
      var isChecked = evt.currentTarget.checked;
      that._setFilter(value, isChecked);
    });
  },

  _createResults: function () {
    this._resultContainer = L.DomUtil.create('div', 's-container hide', this._container);
    this._results = L.DomUtil.create('ul', 'c-search__results', this._resultContainer);
  },

  _createResult: function (result) {
    var resultElem = L.DomUtil.create('li', RESULT_ITEM, this._results);
    resultElem.innerHTML = '<div class="row">' +
      '<div class="col-xs-9">' + 
        '<div class="c-search__results__item__title">' + result.properties.Title + '</div>' +
        '<div class="c-search__results__item__author">' + result.properties.Author + '</div>' +
        '<div class="c-search__results__item__date">' + result.properties.Date + '</div>' +
      '</div>' +
      '<div class="col-xs-3">' +
        '<img src="http://cdn.wanderingtrader.com/wp-content/uploads/2011/03/IMG_1971.jpg" class="c-search__results__item__img">' +
      '</div>' +
    '</div>'; 
  },

  _setFilter: function (value, isChecked) {
    this._searchFilters[value] = isChecked;
    this._refreshResults();
  },

  _setSearchText: function (searchText) {
    this._searchText = searchText.toLowerCase();
    this._refreshResults();
  },

  _refreshResults: function () {
    var results = _.filter(this.options.items, function (item) {
      return this._filterBySearchText(item) && this._filterByFilters(item);
    }, this);

    if (_.isEmpty(this._searchText)) {
      L.DomUtil.addClass(this._resultContainer, 'hide');
    } else {
      L.DomUtil.removeClass(this._resultContainer, 'hide');
    }

    $('.' + RESULT_ITEM).remove();

    _.forEach(results, function (result) {
      this._createResult(result);
    }, this);

    this.options.onSearch(results);
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

L.control.search = function (options) {
  return new L.Control.Search(options);
};

module.exports = L.control.search;