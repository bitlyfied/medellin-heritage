'use strict';

var React      = require('react');
var MapStore   = require('../stores/mapStore');
var SelectList = require('react-widgets/lib/SelectList');
var Actions    = require('../actions');

var Filters = React.createClass({
  getInitialState: function () {
    return {
      categories: MapStore.getHeritageCategories()
    };
  },

  onChange: function (categories) {
    Actions.filter(categories);
  },

  render: function() {
    return (
      <div>
        <SelectList data={ this.state.categories }
                    onChange={ this.onChange }
                    multiple={ true }></SelectList>
      </div>
    );
  }

});

module.exports = Filters;