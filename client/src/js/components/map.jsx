'use strict';

var React         = require('react');
var MapStore      = require('../stores/mapStore');
var Reflux        = require('reflux');
var Actions       = require('../actions');
var searchFactory = require('../leafletComponents/controlFrame');
var logoFactory   = require('../leafletComponents/logo');
var Constants     = require('../constants');


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
      center: [6.247263, -75.569742],
      zoom: 15,
      minZoom: 2,
      maxZoom: 22,
      zoomControl: false
    });
    
    Reflux.ListenerMethods.listenTo(Actions.itemSelected, function (selectedFeature) {
      var lng = selectedFeature.geometry.coordinates[0];
      var lat = selectedFeature.geometry.coordinates[1];
      map.panTo(new L.LatLng(lat, lng));
    });

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 22,
        id: 'rickymetz.9458305e',
        accessToken: 'pk.eyJ1Ijoicmlja3ltZXR6IiwiYSI6IjQ0MDkxNWJiOTU0ZWJmMzNkMGVlODZiOWM0ODgwNmMwIn0.n3vqv0FdFTjASE09SDiUSg'
      }
    ).addTo(map);

    var statueIconUnselected = L.divIcon({ className: 'map-pin statue small light', iconSize: [15,15], html: '<div class="icon icon-icon-statue"></div>'});
    var statueIconNeutral = L.divIcon({ className: 'map-pin statue medium dark', iconSize: [25,25], html: '<div class="icon icon-icon-statue"></div>'});
    var statueIconSelected = L.divIcon({ className: 'map-pin statue large dark', iconSize: [35,35], html: '<div class="icon icon-icon-statue"></div>'});
    var archsiteIconUnselected = L.divIcon({ className: 'map-pin dig small light', iconSize: [15,15], html: '<div class="icon icon-icon-dig"></div>' });
    var archsiteIconNeutral = L.divIcon({ className: 'map-pin dig medium dark', iconSize: [25,25], html: '<div class="icon icon-icon-dig"></div>' });
    var archsiteIconSelected = L.divIcon({ className: 'map-pin dig large dark', iconSize: [35,35], html: '<div class="icon icon-icon-dig"></div>' });

    var geoJsonLayer = L.geoJson(items, { onEachFeature: content }).addTo(map);

    var zoomCtrl = L.control.zoom({ position: 'bottomleft' });
    zoomCtrl.addTo(map);

    var searchCtrlOpts = {
      position: 'topleft'
    };
    var searchCtrl = searchFactory(searchCtrlOpts);
    searchCtrl.addTo(map);

    var logoOpts = {
      position: 'bottomright'
    };
    var logo = logoFactory(logoOpts);
    logo.addTo(map);

    MapStore.listen(onSearch);

    function onSearch () {
      var newItems = MapStore.getFilteredHeritageItems();
      geoJsonLayer.clearLayers();
      geoJsonLayer.addData(newItems);
    }

    function content (feature, layer) {
      var icon;
      var selectedFeature = MapStore.getSelectedFeature();

      if (selectedFeature) {
        if (selectedFeature.properties.id === feature.properties.id) {
          icon = feature.properties.type === 'Escultura' ? statueIconSelected : archsiteIconSelected;
        } else {
          icon = feature.properties.type === 'Escultura' ? statueIconUnselected : archsiteIconUnselected;
        }
      } else {
        icon = feature.properties.type === 'Escultura' ? statueIconNeutral : archsiteIconNeutral;
      }

      layer.setIcon(icon);
      layer.on('click', onMarkerClick);
    }

    function onMarkerClick (evt) {
      var feature = evt.target.feature;
      Actions.selectItem(feature.properties.id);
    }
  },

  render: function () {
    return (
      <div className="map"></div>
    );
  }

});

module.exports = Map;