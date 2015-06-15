'use strict';

/* global $ */

var resultItem = require('./resultItem');
var mapStore   = require('../stores/mapStore');
var _          = require('lodash');

var resultList = {
  create: function (container) {
    this._container = container;
    this._createElem();
  },

  _createElem: function () {
    this._container.innerHTML = '<ul class="c-result-list"></ul>';
  },

  update: function () {
    var resultItemContainer = $('.c-result-list').first();
    var items = _.take(mapStore.getFilteredHeritageItems(), 8);

    resultItemContainer.children().remove();

    _.forEach(items, function (item) {
      var options = {
        props: item.properties,
        container: resultItemContainer[0],
        isSearchResult: true
      };

      resultItem.create(options);
    });
  }
};

module.exports = resultList;