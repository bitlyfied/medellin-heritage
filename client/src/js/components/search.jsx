'use strict';

var React     = require('react');
var MapStore  = require('../stores/mapStore');
var Combobox  = require('react-widgets/lib/Combobox');
var Actions   = require('../actions');

var Search = React.createClass({
  getInitialState: function () {
    return {
      items: getSearchItems()
    };
  },

  onChange: function (searchText) {
    Actions.search(searchText);
  },

  render: function() {
    return (
      <div className="c-search-box">
        <Combobox
          onChange={ this.onChange }
          data={ this.state.items }
          filter="contains" />
      </div>
    );
  }

});

module.exports = Search;

function getSearchItems () {
  var titles = MapStore.getTitles();
  var artists = MapStore.getArtists();

  return titles.concat(artists);
}