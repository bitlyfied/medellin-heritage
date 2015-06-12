'use strict';

/* global $ */

//TODO
//- Handle scenario when no search text...Back to results button doesn't make sense
//- Spanish-ize text
//- Need Rick to style

var actions = require('../actions');

var actionButtons = {
  create: function (container) {
    this._container = container;
    this._createElem();
  },

  _createElem: function () {
    this._container.innerHTML = '<div class="row">' +
      '<div class="col-xs-6 c-action-btn">' +
        '<button type="button" class="btn back-to-results">&lt; Back to Results</button>' +
      '</div>' +
      '<div class="col-xs-6 c-action-btn">' +
        '<button type="button" class="btn new-search">New Search</button>' +
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