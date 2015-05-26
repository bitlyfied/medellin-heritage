'use strict';

var React         = require('react');
var Reflux        = require('reflux');
var Map           = require('./map.jsx');
var Search        = require('./search.jsx');
var Filters       = require('./filters.jsx');
var ViewToggle    = require('./viewToggle.jsx');
var ViewConstants = require('../constants').views;
var MapStore      = require('../stores/mapStore');
var ListView      = require('./listView.jsx');

var MapContainer = React.createClass({
  mixins: [Reflux.listenTo(MapStore, 'onMapStore')],

  getInitialState: function () {
    return {
      activeView: MapStore.getActiveView()
    };
  },
  
  onMapStore: function () {
    this.setState({ activeView: MapStore.getActiveView() });
  },

  render: function () {
    var view = this.state.activeView === ViewConstants.map ? <Map /> : <ListView />;

    return (
      <div>
        <div className="row">
          <div className="col-xs-5">
            <Search />
          </div>
          <div className="col-xs-3 col-xs-offset-2">
            <ViewToggle />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-9 c-map">
            { view }
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