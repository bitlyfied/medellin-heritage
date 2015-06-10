'use strict';

var React    = require('react');
var MapStore = require('../stores/mapStore');
var Reflux   = require('reflux');
var searchFactory   = require('../leafletComponents/controlFrame');
var resultFactory = require('../leafletComponents/result');

var Map = React.createClass({
  componentDidMount: function () {
    var result;
    var items = MapStore.getHeritageItems();
    var filters = MapStore.getHeritageCategories();
    var map = this.map = L.map(this.getDOMNode(), {
      center: [6.174469, -75.584556],
      zoom: 15,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false
    });

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mandym.0417cffe',
        accessToken: 'pk.eyJ1IjoibWFuZHltIiwiYSI6InJ0N0t5UzQifQ.QuC-ffTnnah5oonnfh-hlQ'
      }
    ).addTo(map);

    var statueIcon = new L.Icon({ iconUrl: 'images/icon-statue-25.png'});
    var archsiteIcon = new L.Icon({ iconUrl: 'images/icon-dig-25.png'});

    L.geoJson(items, { onEachFeature: content }).addTo(map);

    var zoomCtrl = L.control.zoom({ position: 'bottomleft' });
    zoomCtrl.addTo(map);

    var searchCtrlOpts = {
      position: 'topleft'
    };
    var searchCtrl = searchFactory(searchCtrlOpts);
    searchCtrl.addTo(map);

    MapStore.listen(onSearch);

    function onSearch () {
      console.log(MapStore.getFilteredHeritageItems());
    }

    function content (feature, layer) {
      var icon = feature.properties.Type === 'statue' ? statueIcon : archsiteIcon;
      layer.setIcon(icon);
      layer.on('click', onMarkerClick);
    }

    function onMarkerClick (evt) {
      var feature = evt.target.feature;
      if (result) {
        result.removeFrom(map);
      }
      result = resultFactory({ feature: feature, position: 'topright' });
      result.addTo(map);
    }
  },

  render: function () {
    return (
      <div className="map"></div>
    );
  }

});

module.exports = Map;