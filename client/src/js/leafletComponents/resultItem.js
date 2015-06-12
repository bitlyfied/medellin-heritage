'use strict';

//TODO: 
//  -Use real img src
//  -CHECK - Styling on the left side of the results item needs padding.
//  -Handle architecture properties
//  -Share, Directions, & Search
//  -Handle click event on item when isSearchResult === true to select item

var resultItem = {
  create: function (options) {
    this._options = options;
    var rhc = options.isSearchResult ? this._createSearchRHC() : this._createDetailRHC();
    var resultItemHTML = '<div class="row">' +
      '<div class="col-xs-6 c-result-item">' + 
        '<div class="c-result-item__title">' + options.props.Title + '</div>' +
        '<div class="c-result-item__author">' + options.props.Author + '</div>' +
        '<div class="c-result-item__year">' + options.props.Date + '</div>' +
      '</div>' + 
      rhc +
    '</div>'; 
    options.container.innerHTML += resultItemHTML;
  },

  _createSearchRHC: function () {
    return '<div class="col-xs-offset-3 col-xs-3">' +
        '<img src="http://cdn.wanderingtrader.com/wp-content/uploads/2011/03/IMG_1971.jpg" class="c-result-item__img">' +
      '</div>';
  },

  _createDetailRHC: function () {
    return '<div class="sharing col-xs-6">' + 
      '<div class="row">' +
        '<div class="col-md-4"><p><i class="fa fa-2x fa-share-alt"></i></p><p>Share</p></div>' +
        '<div class="col-md-4"><p><i class="fa fa-2x fa-google"></i></p><p><a href="https://www.google.com.co/search?q=' + this._options.props.Title + '" target="new">Learn More</a></p></div>' +
        '<div class="col-md-4"><p><i class="fa fa-2x fa-location-arrow"></i></p><p>Directions</p></div>' + 
      '</div>' +
    '</div>';
  }
};

module.exports = resultItem;

// LEARN MORE LINK
// <a href="https://www.google.com.co/search?q=' + options.props.Title + '" target="new">Learn More</a>
            

   
                // '<p><a href="https://twitter.com/share" class="twitter-share-button" data-text="¡Conoce la ubicación del patrimonio de Medellín!" data-lang="es" data-count="none">Twittear</a>' +
     
