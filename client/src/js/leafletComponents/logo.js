'use strict';

/* global L */

var Constants = require('../constants');

L.Control.Logo = L.Control.extend({
  initialize: function (options) {
    L.Util.setOptions(this, options);
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'c-logo', map.getContainer());
    container.innerHTML = '<img src="' + Constants.logo + '" />';

    return container;
  }
});

L.control.logo = function (options) {
  return new L.Control.Logo(options);
};

module.exports = L.control.logo;