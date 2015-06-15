'use strict';

/* global $ */

//TODO
//- DONE- Handle scenario when no search text...Back to results button doesn't make sense
//- DONE - Spanish-ize text
//- DONE- Need Rick to style

var actions = require('../actions');
var localization = require('../localization');
var mapStore = require('../stores/mapStore');

var actionButtons = {
  create: function (container) {
    this._container = container;
    this._createElem();
  },

  _createElem: function () {
    var backButtonHtml = mapStore.shouldHideBackToResultsBtn() ? '' : '<div class="col-xs-6 c-action-btn">' +
        '<button type="button" class="btn back-to-results"><i class="fa fa-chevron-left"></i> ' + localization.back + '</button>' +
      '</div>';

    this._container.innerHTML = '<div class="row">' +
      backButtonHtml +
      '<div class="col-xs-6 c-action-btn">' +
        '<button type="button" class="btn new-search">' + localization.newSearch + '</button>' +
      '</div>' +
    '</div>';

    $('.back-to-results').click(this._onBackToResults.bind(this));
    $('.new-search').click(this._onNewSearch.bind(this));
  },

  _onBackToResults: function (evt) {
    actions.backToResults();
  },

  _onNewSearch: function (evt) {
    actions.newSearch();
  }
};

module.exports = actionButtons;