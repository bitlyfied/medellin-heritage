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
    var resultContainer = $('.c-result-selected')[0];
    var selectedFeature = mapStore.getSelectedFeature();
    var props = selectedFeature.properties;

    resultContainer.innerHTML = '<div class="c-result-selected__details"></div>';
    var options = {
      props: props,
      isSearchResult: false
    };
    var html = resultItem.create(options);
    var detailContainer = $('.c-result-selected__details')[0];
    detailContainer.innerHTML = html;
  }
};

module.exports = resultSelected;