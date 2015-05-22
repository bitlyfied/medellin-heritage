'use strict';

var Reflux = require('reflux');

var _heritageData = [
  { title: 'title1', artist: 'artist1' },
  { title: 'title2', artist: 'artist2' }
];

var MapStore = Reflux.createStore({
  getHeritageItems: function () {
    return _heritageData;
  }
});

module.exports = MapStore;