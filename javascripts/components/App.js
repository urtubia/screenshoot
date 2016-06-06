import React from "react";
import { connect } from 'react-redux'
import FileList from "./FileList"
import Settings from "./Settings"
import NavigationTabs from "./NavigationTabs"

var App = React.createClass({
  render: function() {

    var page = <FileList/>;
    if(this.props.appTab.current == 'settings'){
      page = <Settings/>;
    }
    return (<div>
            <NavigationTabs/>
            { page }
            </div>);
  }
});

var mapStateToProps = (state, ownProps) => {
  return state;
};

module.exports = connect(mapStateToProps)(App);

