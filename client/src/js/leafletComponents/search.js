'use strict';

/* global $ */

var actions = require('../actions');
var mapStore = require('../stores/mapStore');

var search = {
  create: function (container) {
    this._container = container;
    this._createElem();
    mapStore.listen(this._setSearchText.bind(this));
  },

  _createElem: function () {
    this._container.innerHTML = '<input class="c-search__search__input />' + 
      '<i class="fa fa-search fa-lg c-search__search__icon"><i>';
    
    var that = this;
    $('.c-search__search__input')[0].onkeyup = function (evt) {
      var searchText  = evt.currentTarget.value;
      actions.search(searchText);
    };
  },

  _setSearchText: function () {
    var searchText = mapStore.getSearchText();
    $('.c-search__search__input').val(searchText);
  }
};

module.exports = search;