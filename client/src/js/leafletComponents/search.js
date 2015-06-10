'use strict';

/* global $ */

var actions = require('../actions');
//container

var search = {
  create: function (container) {
    this._container = container;
    this._createElem();
  },

  _createElem: function () {
    this._container.innerHTML = '<input class="c-search__search__input />' + 
      '<i class="fa fa-search fa-lg c-search__search__icon"><i>';
    
    var that = this;
    $('.c-search__search__input')[0].onkeyup = function (evt) {
      var searchText  = evt.currentTarget.value;
      actions.search(searchText);
    };
  }
};

module.exports = search;