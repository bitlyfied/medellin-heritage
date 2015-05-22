'use strict';

var React    = require('react');
var MapStore = require('../stores/mapStore');

var Map = React.createClass({
  getInitialState: function () {
    return {
      heritageItems: MapStore.getHeritageItems()
    };
  },

  render: function () {
    return (
      <div>
        { this.state.heritageItems }
      </div>
    );
  }

});

module.exports = Map;