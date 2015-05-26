'use strict';

var React     = require('react');
var MapStore  = require('../stores/mapStore');
var Combobox  = require('react-widgets/lib/Combobox');

var Search = React.createClass({
  getInitialState: function () {
    return {
      items: getSearchItems()
    };
  },

  filterSearch: function (option, searchText) {
    var lcSearchText = searchText.toLowerCase();
    var lcOption     = option.toLowerCase();
    
    return lcOption.indexOf(lcSearchText) > -1;
  },

  render: function() {
    return (
      <Combobox
        onChange={ onChange }
        data={ this.state.items }
        filter={ this.filterSearch } />
    );
  }

});

module.exports = Search;

function getSearchItems () {
  var titles = MapStore.getTitles();
  var artists = MapStore.getArtists();

  return titles.concat(artists);
}

function onChange (a,b,c) {
  debugger;
  console.log(a);
  console.log(b);
  console.log(c);
} 