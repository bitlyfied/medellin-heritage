'use strict';

/* global $ */

var actions = require('../actions');

var actionButtons = {
  create: function (container) {
    this._container = container;
    this._createElem();
  },

  //TODO handle scenario when no search text...Back to results button doesn't make sense
  _createElem: function () {
    this._container.innerHTML = '<div class="row">' +
      '<div class="col-xs-6">' +
        '<button type="button" class="btn btn-primary back-to-results">&lt; Back to Results</button>' +
      '</div>' +
      '<div class="col-xs-6">' +
        '<button type="button" class="btn btn-primary new-search">New Search</button>' +
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