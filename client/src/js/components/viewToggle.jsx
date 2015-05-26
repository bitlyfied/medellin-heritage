'use strict';

var React         = require('react');
var Actions       = require('../actions');
var ViewConstants = require('../constants').views;

var ViewToggle = React.createClass({
  showMapView: function () {
    Actions.toggleView(ViewConstants.map);
  },

  showListView: function () {
    Actions.toggleView(ViewConstants.list);
  },

  render: function() {
    return (
      <div>
        <button type="button"
                className="btn btn-primary"
                onClick={ this.showMapView }>Map View</button>
        <button type="button"
                className="btn btn-primary"
                onClick={ this.showListView }>List View</button>

      </div>
    );
  }

});

module.exports = ViewToggle;