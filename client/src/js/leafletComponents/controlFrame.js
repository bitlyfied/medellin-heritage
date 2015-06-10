'use strict';
/* global L */

var _ = require('lodash');
var search = require('./search');
var filters = require('./filters');
var resultList = require('./resultList');
var mapStore = require('../stores/mapStore');
var actionButtons = require('./actionButtons');
// var actions = require('./actions');


L.Control.ControlFrame = L.Control.extend({
  initialize: function (options) {
    L.Util.setOptions(this, options);

    this._isShowingFilters = true;
  },

  onAdd: function (map) {
    this._map = map;
    var container = this._container = this._createContainer();
    this._createSearchFrame();
    this._createActionFrame();
    this._createResultFrame();
    this.unsubscribe = mapStore.listen(this._refreshResults.bind(this));

    return container;
  },

  _createContainer: function () {
    var mapContainer = this._map.getContainer();
    var container    = this._container = L.DomUtil.create('div', 'c-search', mapContainer);
    var stop         = L.DomEvent.stopPropagation;
    
    L.DomEvent
      .on(container, 'click', stop)
      .on(container, 'dblclick', stop)
      .on(container, 'mousedown', stop)
      .on(container, 'touchstart', stop)
      .on(container, 'mousewheel', stop);

    return container;
  },

  _createSearchFrame: function () {
    var searchContainer = L.DomUtil.create('div', '', this._container);

    search.create(searchContainer);
  },

  _createActionFrame: function () {
    var actionContainer = this._actionContainer = L.DomUtil.create('div', 's-container c-search__filters row', this._container);

    filters.create(actionContainer);
  },

  _createResultFrame: function () {
    var resultContainer = this._resultContainer = L.DomUtil.create('div', 's-container hide', this._container);

    resultList.create(resultContainer);
  },

  _refreshResults: function () {
    if (mapStore.shouldHideResults()) {
      L.DomUtil.addClass(this._resultContainer, 'hide');
    } else {
      L.DomUtil.removeClass(this._resultContainer, 'hide');
    }

    if (mapStore.shouldShowFilters() && !this._isShowingFilters) {
      // var childElem = this._resultContainer.childNodes[0];
      // this._resultContainer.removeChild(childElem);
      this._isShowingFilters = true;
      filters.create(this._actionContainer);
    } else if (!mapStore.shouldShowFilters() && this._isShowingFilters) {
      this._isShowingFilters = false;
      actionButtons.create(this._actionContainer);
    }
  },

  // _setFilter: function (value, isChecked) {
  //   this._searchFilters[value] = isChecked;
  //   this._refreshResults();
  // },

  // _setSearchText: function (searchText) {
  //   this._searchText = searchText.toLowerCase();
  //   this._refreshResults();
  // },

  // _refreshResults: function () {
  //   var items = mapStore.getFilteredHeritageItems();
  //   // var searchText = mapStore.getSearchText();

  //   // var results = _.filter(this.options.items, function (item) {
  //   //   return this._filterBySearchText(item) && this._filterByFilters(item);
  //   // }, this);

  //   // if (_.isEmpty(searchText)) {
  //   //   L.DomUtil.addClass(this._resultContainer, 'hide');
  //   // } else {
  //   //   L.DomUtil.removeClass(this._resultContainer, 'hide');
  //   // }

  //   $('.c-search__results__item').remove();

  //   _.forEach(items, function (result) {
  //     this._createResult(result);
  //   }, this);
  // },
});

L.control.controlFrame = function (options) {
  return new L.Control.ControlFrame(options);
};

module.exports = L.control.controlFrame;