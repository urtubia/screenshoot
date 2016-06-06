import { connect } from 'react-redux'
import React from "react";

var Settings = React.createClass({
  render: function() {
    return <div>
    SETTINGS
          </div>
  }
});

var mapStateToProps = (state, ownProps) => {
  return state;
};

module.exports = connect(mapStateToProps)(Settings);

