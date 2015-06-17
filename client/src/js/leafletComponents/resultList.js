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
    this._container.innerHTML = '<ul class="c-result-list js-result-list"></ul>';
  },

  update: function () {
    var resultItemContainer = $('.c-result-list').first();
    var items = mapStore.getFilteredHeritageItems();
    var html = '';

    resultItemContainer.children().remove();

    _.forEach(items, function (item) {
      var options = {
        props: item.properties,
        container: resultItemContainer[0],
        isSearchResult: true
      };

      html += resultItem.create(options);
    });

    resultItemContainer[0].innerHTML = html;
    resultItem.addSearchResultHanlders();
  }
};

module.exports = resultList;