'use strict';
/* global L */

//TODO
// -isShowingFilters && shouldShowFilters() are bad names
// -Do we need to handle onRemove? (Clean up event listener)
// -_refreshResults() smells

var _              = require('lodash');
var search         = require('./search');
var filters        = require('./filters');
var resultList     = require('./resultList');
var mapStore       = require('../stores/mapStore');
var actionButtons  = require('./actionButtons');
var resultSelected = require('./resultSelected');
var lightbox       = require('./lightbox');

L.Control.ControlFrame = L.Control.extend({
  initialize: function (options) {
    L.Util.setOptions(this, options);

    this._isShowingFilters = true;
  },

  onAdd: function (map) {
    var container = this._container = this._createContainer(map);

    this._createSearch();
    this._createAction();
    this._createLightbox();
    this._createResults();

    this.unsubscribe = mapStore.listen(this._refreshResults.bind(this));

    return container;
  },

  _createContainer: function (map) {
    var mapContainer = map.getContainer();
    var container    = this._container = L.DomUtil.create('div', 'c-control-frame', mapContainer);
    var stop         = L.DomEvent.stopPropagation;
    
    L.DomEvent
      .on(container, 'click', stop)
      .on(container, 'dblclick', stop)
      .on(container, 'mousedown', stop)
      .on(container, 'touchstart', stop)
      .on(container, 'mousewheel', stop);

    return container;
  },

  _createSearch: function () {
    var searchContainer = L.DomUtil.create('div', 'c-control-frame__search', this._container);

    search.create(searchContainer);
  },

  _createAction: function () {
    var actionContainer = this._actionContainer = L.DomUtil.create('div', 'c-control-frame__actions row', this._container);

    filters.create(actionContainer);
  },

  _createLightbox: function () {
    this._lightboxContainer = L.DomUtil.create('div', 'hide c-control-frame__lightbox', this._container);
  },

  _createResults: function () {
    var resultContainer = this._resultContainer = L.DomUtil.create('div', 'c-control-frame__results hide', this._container);

    resultList.create(resultContainer);
  },

  _refreshResults: function () {
    if (mapStore.shouldHideResults()) {
      L.DomUtil.addClass(this._resultContainer, 'hide');
    } else {
      L.DomUtil.removeClass(this._resultContainer, 'hide');
    }

    if (mapStore.shouldShowFilters()) {
      if (!this._isShowingFilters) {
        resultList.create(this._resultContainer);
        filters.create(this._actionContainer);
      }

      resultList.update();
      this._isShowingFilters = true;
      L.DomUtil.addClass(this._lightboxContainer, 'hide');
      
    } else if (!mapStore.shouldShowFilters()) {
      if (this._isShowingFilters) {
        L.DomUtil.removeClass(this._lightboxContainer, 'hide');
        actionButtons.create(this._actionContainer);
        lightbox.create(this._lightboxContainer);
        resultSelected.create(this._resultContainer);
      }

      lightbox.update();
      resultSelected.update();
      this._isShowingFilters = false;
    }
  },
});

L.control.controlFrame = function (options) {
  return new L.Control.ControlFrame(options);
};

module.exports = L.control.controlFrame;