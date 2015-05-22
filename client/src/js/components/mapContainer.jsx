'use strict';

var React   = require('react');
var Map     = require('./map.jsx');
var Search  = require('./search.jsx');
var Filters = require('./filters.jsx');

var MapContainer = React.createClass({

  render: function() {
    return (
      <div>
        <div className="row col-xs-12">
          <Search />
        </div>
        <div className="row">
          <div className="col-xs-9">
            <Map />
          </div>
          <div className="col-xs-3">
            <Filters />
          </div>
        </div> 
      </div>
    );
  }

});

module.exports = MapContainer;