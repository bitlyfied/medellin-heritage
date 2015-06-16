'use strict';

/* global $ */

var localization = require('../localization');
var Constants    = require('../constants');
var actions      = require('../actions');
var _            = require('lodash');

//TODO: 
//  -DONE- Use real img src
//  -CHECK - Styling on the left side of the results item needs padding fixed.
//  -Handle architecture properties
//  -Directions
//  -DONE Handle click event on item when isSearchResult === true to select item

var resultItem = {
  create: function (options) {
    this._options = options;
    var resultItemCss = options.isSearchResult ? 'col-xs-9 c-result-item--individual'  : 'col-xs-6 c-result-item';
    var rhc = options.isSearchResult ? this._createSearchRHC() : this._createDetailRHC();

    var resultItemHTML = '<div class="row row-no-margin js-result-item" data-feature-id="' + options.props.id + '">' +
      '<div class="' + resultItemCss + '">' + 
        '<div class="c-result-item__title">' + options.props.title + '</div>' +
        '<div class="c-result-item__author">' + options.props.author + '</div>' +
        '<div class="c-result-item__year">' + options.props.year + '</div>' +
      '</div>' + 
      rhc +
    '</div>'; 
    options.container.innerHTML += resultItemHTML;

    if (options.isSearchResult) {
      $('.js-result-item').on('click', function (evt) {
        var id = _.parseInt(evt.currentTarget.attributes['data-feature-id'].value);
        actions.selectItem(id);
      });      
    }
  },

  _createSearchRHC: function () {
    var imgSrc = Constants.imageSrcRoot + this._options.props.image_name;
    return '<div class="col-xs-3">' +
        '<img src="' + imgSrc + '" class="c-result-item__img pull-right">' +
      '</div>';
  },

  _createDetailRHC: function () {
    return '<div class="c-result-item__links col-xs-6">' + 
      '<div class="row">' +
        '<div class="col-md-4"><p><i class="fa fa-2x fa-share-alt"></i></p><p class="c-result-item__sharing"><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://patrimoniomedellin.com/" data-text="¡Conoce la ubicación del patrimonio de Medellín!" data-count="none"><i class="fa fa-2x fa-twitter"></i></a><a href="https://www.facebook.com/sharer/sharer.php?u=patrimoniomedellin.com" target="_blank"><i class="fa fa-2x fa-facebook"></i></a></p></div>' +
        '<div class="col-md-4"><p><i class="fa fa-2x fa-google"></i></p><p><a href="https://www.google.com.co/search?q=' + this._options.props.title + '" target="new">' + localization.learnMore + '</a></p></div>' +
        '<div class="col-md-4"><p><i class="fa fa-2x fa-location-arrow"></i></p><p>' + localization.directions + '</p></div>' + 
      '</div>' +
    '</div>';
  }
};

module.exports = resultItem;


