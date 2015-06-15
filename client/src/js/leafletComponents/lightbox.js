'use strict';

/*global $ */

//TODO 
// -Need to set img src to selectedFeature's src

var mapStore = require('../stores/mapStore');

var lightbox = {
  create: function (container) {
    this._container = container;
    this._createElem();
  },

  _createElem: function () {
    this._container.innerHTML = '<div class="c-lightbox">' + 
     '<img src="" class="c-lightbox__img">' +
    '</div>';
  },

  update: function () {
    // this._selectedFeature = mapStore.getSelectedFeature();
    var src = 'http://cdn.wanderingtrader.com/wp-content/uploads/2011/03/IMG_1971.jpg';
    $('.c-lightbox__img').attr('src', src);
  }
};

module.exports = lightbox;

