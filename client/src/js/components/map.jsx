'use strict';

var React         = require('react');
var MapStore      = require('../stores/mapStore');
var Reflux        = require('reflux');
var Actions       = require('../actions');
var searchFactory = require('../leafletComponents/controlFrame');

//TODO
// - Move "magic strings" to constants
// - Clean up "componentDidMount" funciton
// - DONE - Update map style
// - DONE - Make map full screen then remove style from main.less
// - Update map logo with Medelling heritage

var Map = React.createClass({
  componentDidMount: function () {
    var result;
    var items = MapStore.getFilteredHeritageItems();
    var filters = MapStore.getHeritageCategories();
    var map = this.map = L.map(this.getDOMNode(), {
      center: [6.201000, -75.572138],
      zoom: 15,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false
    });

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'rickymetz.9458305e',
        accessToken: 'pk.eyJ1Ijoicmlja3ltZXR6IiwiYSI6IjQ0MDkxNWJiOTU0ZWJmMzNkMGVlODZiOWM0ODgwNmMwIn0.n3vqv0FdFTjASE09SDiUSg'
      }
    ).addTo(map);

    var statueIcon = new L.Icon({ iconUrl: 'images/icon-statue-25.png'});
    var archsiteIcon = new L.Icon({ iconUrl: 'images/icon-dig-25.png'});

    var geoJsonLayer = L.geoJson(items, { onEachFeature: content }).addTo(map);

    var zoomCtrl = L.control.zoom({ position: 'bottomleft' });
    zoomCtrl.addTo(map);

    var searchCtrlOpts = {
      position: 'topleft'
    };
    var searchCtrl = searchFactory(searchCtrlOpts);
    searchCtrl.addTo(map);

    MapStore.listen(onSearch);

    function onSearch () {
      var newItems = MapStore.getFilteredHeritageItems();
      geoJsonLayer.clearLayers();
      geoJsonLayer.addData(newItems);
    }

    function content (feature, layer) {
      var icon = feature.properties.type === 'Escultura' ? statueIcon : archsiteIcon;
      layer.setIcon(icon);
      layer.on('click', onMarkerClick);
    }

    function onMarkerClick (evt) {
      var feature = evt.target.feature;
      Actions.itemSelect(feature);
    }
  },

  render: function () {
    return (
      <div className="map"></div>
    );
  }

});

module.exports = Map;