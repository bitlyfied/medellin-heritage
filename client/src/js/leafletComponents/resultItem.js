'use strict';

var resultItem = {
  create: function (options) {
    this._options = options;
    var rhc = options.isSearchResult ? this._createSearchRHC() : this._createDetailRHC();
    var resultItemHTML = '<div class="row">' +
      '<div class="col-xs-6">' + 
        '<div class="c-search__results__item__title">' + options.props.Title + '</div>' +
        '<div class="c-search__results__item__author">' + options.props.Author + '</div>' +
        '<div class="c-search__results__item__year">' + options.props.Date + '</div>' +
      '</div>' + 
      rhc +
    '</div>'; 
    options.container.innerHTML += resultItemHTML;
  },

  _createSearchRHC: function () {
    return '<div class="col-xs-offset-3 col-xs-3">' +
        '<img src="http://cdn.wanderingtrader.com/wp-content/uploads/2011/03/IMG_1971.jpg" class="c-search__results__item__img">' +
      '</div>';
  },

  _createDetailRHC: function () {
    return '<div class="col-xs-6">' + 
      'Share, directions, search' + 
    '</div>';
  }
};

module.exports = resultItem;