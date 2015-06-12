'use strict';

/* global $ */

//TODO 
// -add icons to checkboxes
// -Make sure first letter of checkbox label capitalized
// -spanish-ize text

var _        = require('lodash');
var actions  = require('../actions');
var mapStore = require('../stores/mapStore');

var filters = {
  create: function (container) {
    this._container = container;
    this._filters = mapStore.getSearchFilters();
    this._createElem();
  },

  _createElem: function () {
    this._container.innerHTML = '<div class="c-filters__title col-xs-3">Show:</div>' + 
      '<div class="col-xs-9">' +
        '<ul class="c-filters__list"></ul>' +
      '</div>';

    _.forEach(this._filters, function (val, key) {
      this._createFilter(val, key);
    }, this);
  },

  _createFilter: function (isChecked, name) {
    var filterGroup = $('.c-filters__list')[0];
    var checkedAttr = isChecked ? ' checked' : '';

    var filterHTML = '<li class="c-filters__list__item">' +
      '<div class="checkbox c-filters__list__item__checkbox">' + 
        '<label>' +
          '<input type="checkbox" value="' + name + '"' + checkedAttr + '>' + name +
        '</label>' + 
      '</div>' +
    '</li>';

    filterGroup.innerHTML += filterHTML;

    var that = this;
    $('.c-filters__list__item__checkbox input').change(function (evt) {
      var value = evt.currentTarget.value;
      var isChecked = evt.currentTarget.checked;
      actions.filter(value, isChecked);
    });
  },
};

module.exports = filters;