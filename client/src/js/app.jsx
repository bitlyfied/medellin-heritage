'use strict';

var React        = require('react');
var MapContainer = require('./components/mapContainer.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <MapContainer />
      </div>
    );
  }
});

module.exports = App;