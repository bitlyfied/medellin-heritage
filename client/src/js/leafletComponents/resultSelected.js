'use strict';

/* global $ */

var resultItem = require('./resultItem');
var mapStore   = require('../stores/mapStore');

var resultSelected = {
  create: function (container) {
    this._container = container;
    this._createElem();
  },

  _createElem: function () {
    this._container.innerHTML = '<div class="c-result-selected"></div>';
  },

  update: function () {
    var resultContainer = $('.c-result-selected').first();
    var selectedFeature = mapStore.getSelectedFeature();
    var props = selectedFeature.properties;

    resultContainer.append('<div class="c-result-selected__details"></div>');
    var detailContainer = $('.c-result-selected__details')[0];
    var options = {
      props: props,
      container: detailContainer,
      isSearchResult: false
    };
    resultItem.create(options);
  }
};

module.exports = resultSelected;