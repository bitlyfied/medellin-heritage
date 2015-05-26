'use strict';

var React = require('react');

var ListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>{ this.props.item.Title } by { this.props.item.Author } is a { this.props.item.Type }</div>
    );
  }

});

module.exports = ListItem;