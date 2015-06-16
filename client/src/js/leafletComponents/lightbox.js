'use strict';

/*global $ */

var Constants = require('../constants');

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
    var selectedFeature = mapStore.getSelectedFeature();
    var imgSrc = Constants.imageSrcRoot + selectedFeature.properties.image_name;
    var src = 'http://cdn.wanderingtrader.com/wp-content/uploads/2011/03/IMG_1971.jpg';
    $('.c-lightbox__img').attr('src', imgSrc);
  }
};

module.exports = lightbox;

