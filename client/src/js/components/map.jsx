'use strict';

var React    = require('react');
var MapStore = require('../stores/mapStore');
var Reflux   = require('reflux');

var Map = React.createClass({
  // getInitialState: function () {
  //   return {
  //     heritageItems: MapStore.getHeritageItems()
  //   };
  // },
  
  // mixins: [Reflux.listenTo(MapStore, 'onMapStore')],

  // onMapStore: function () {
  //   debugger;
  //   this.map.featureLayer.setFilter(function (item) { 
  //     console.log(item);
  //     return true;
  //   });
  // },

  componentDidMount: function () {
    var items = MapStore.getHeritageItems();
    var map = this.map = L.map(this.getDOMNode(), {
      center: [6.174469, -75.584556],
      zoom: 15,
      minZoom: 2,
      maxZoom: 18
    });

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mandym.0417cffe',
        accessToken: 'pk.eyJ1IjoibWFuZHltIiwiYSI6InJ0N0t5UzQifQ.QuC-ffTnnah5oonnfh-hlQ'
      }
    ).addTo(map);

    L.geoJson(items).addTo(map);
  },

  render: function () {
    return (
      <div className="map"></div>
    );
  }

});

module.exports = Map;