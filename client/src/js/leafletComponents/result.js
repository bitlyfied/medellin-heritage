'use strict';
/* global L */

var resultItemFactory = require('./resultItem');

L.Control.Result = L.Control.extend({
  initialize: function (options) {
    L.Util.setOptions(this, options);
  },

  onAdd: function (map) {
    var container = this._createContainer(map);
    this._createLightbox();
    this._createDetail();
    return container;
  },

  _createContainer: function (map) {
    var mapContainer = map.getContainer();
    var container = this._container = L.DomUtil.create('div', 'c-result', mapContainer);

    return container;
  },

  _createLightbox: function () {
    var lightboxContainer = L.DomUtil.create('div', '', this._container);

    lightboxContainer.innerHTML = '<img src="http://cdn.wanderingtrader.com/wp-content/uploads/2011/03/IMG_1971.jpg" class="my-img">';
  },

  _createDetail: function () {
    var props = this.options.feature.properties;
    var resultElem = L.DomUtil.create('div', '', this._container);
    var resultItemOptions = {
      props: this.options.feature.properties,
      container: resultElem,
      isSearchResult: false
    };
    resultItemFactory.create(resultItemOptions);
  }
});

L.control.result = function (options) {
  return new L.Control.Result(options);
};

module.exports = L.control.result;