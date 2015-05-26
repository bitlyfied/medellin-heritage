'use strict';

var React    = require('react');
var MapStore = require('../stores/mapStore');
var ListItem = require('./listItem.jsx');
var _        = require('lodash');

var ListView = React.createClass({
  getInitialState: function () {
    return {
      items: MapStore.getHeritageItems()
    };
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