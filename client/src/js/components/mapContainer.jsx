'use strict';

var React   = require('react');
var Map     = require('./map.jsx');

var MapContainer = React.createClass({

  render: function() {
    return (
      <Map />
    );
  }

});

module.exports = MapContainer;