'use strict';

/* global $ */

var _ = require('lodash');
var actions = require('../actions');
var mapStore = require('../stores/mapStore');

var filters = {
  create: function (container) {
    this._container = container;
    this._filters = mapStore.getHeritageCategories();
    this._createElem();
  },

  _createElem: function () {
    this._container.innerHTML = '<div class="c-search__filters__title col-xs-3">Show:</div>' + 
      '<div class="col-xs-9">' +
        '<ul class="c-search__filters__group"></ul>' +
      '</div>';

    _.forEach(this._filters, function (filter) {
      this._createFilter(filter);
    }, this);
  },

  _createFilter: function (filter) {
    var filterGroup = $('.c-search__filters__group')[0];

    var filterHTML = '<li class="c-search__filters__group__item">' +
      '<div class="checkbox c-search__filters__group__item__wrapper">' + 
        '<label>' +
          '<input type="checkbox" class="c-search__filters__group__item__input" value="' + filter + 
          '" checked="checked">' + filter +
        '</label>' + 
      '</div>' +
    '</li>';

    filterGroup.innerHTML += filterHTML;
    // filterGroup.append(filterHTML);

    var that = this;
    $('.c-search__filters__group__item__input').change(function (evt) {
      var value = evt.currentTarget.value;
      var isChecked = evt.currentTarget.checked;
      actions.filter(value, isChecked);
    });
  },
};

module.exports = filters;