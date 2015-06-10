'use strict';

/* global $ */

var resultItem = require('./resultItem');
var mapStore = require('../stores/mapStore');
var _ = require('lodash');

var resultList = {
  create: function (container) {
    this._container = container;
    this._createElem();

    this.unsubscribe = mapStore.listen(this._refreshResults.bind(this));
  },

  _createElem: function () {
    this._container.innerHTML = '<ul class="c-search__results"></ul>';
  },

  _refreshResults: function () {
    var resultItemContainer = $('.c-search__results').first();
    var items = mapStore.getFilteredHeritageItems();

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