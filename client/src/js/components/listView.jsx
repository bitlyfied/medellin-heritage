'use strict';

var React    = require('react');
var Reflux   = require('reflux');
var MapStore = require('../stores/mapStore');
var ListItem = require('./listItem.jsx');
var _        = require('lodash');

var ListView = React.createClass({
  mixins: [Reflux.listenTo(MapStore, 'onMapStore')],

  getInitialState: function () {
    return {
      items: MapStore.getFilteredHeritageItems()
    };
  },

  onMapStore: function () {
    this.setState({ items: MapStore.getFilteredHeritageItems() });
  },

  render: function() {
    var items = _.map(this.state.items, function (item) {
      return (
        <li><ListItem item={ item.properties }></ListItem></li>
      )
    });

    return (
      <ul>
        { items }
      </ul>
    );
  }

});

module.exports = ListView;