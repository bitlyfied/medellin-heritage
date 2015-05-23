'use strict';

var React     = require('react');
var Typeahead = require('react-typeahead').Typeahead;
var MapStore  = require('../stores/mapStore');

var Search = React.createClass({
  getInitialState: function () {
    return {
      items: getSearchItems()
    };
  },

  filterSearch: function (searchText, option) {
    var result =  option.indexOf(searchText) > -1;

    return result;
  },

  render: function() {
    return (
      <Typeahead
        options={ this.state.items }
        maxVisible="5"
        filterOption={ this.filterSearch } />
    );
  }

});

module.exports = Search;

function getSearchItems () {
  var titles = MapStore.getTitles();
  var artists = MapStore.getArtists();

  return titles.concat(artists);
}