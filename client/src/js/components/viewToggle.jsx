'use strict';

var React   = require('react');
var Actions = require('../actions');

var ViewToggle = React.createClass({
  showMapView: function () {
    Actions.showMapView();
  },

  showListView: function () {
    Actions.showListView();
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