import { Provider, connect } from 'react-redux'
import React from "react";

var NavigationTabs = React.createClass({
  changeAppTab: function(tabName) {
    this.props.onChangeAppTab(tabName);
  },

  render: function() {

    return <div>
            <a href="#" onClick={ () => { this.changeAppTab('main'); } }>Main</a> - 
              <a href="#" onClick={ () => { this.changeAppTab('settings'); } }>Settings</a>
          </div>
  }
});

var mapStateToProps = (state, ownProps) => {
  return state;
};

var mapDispatchToProps = (dispatch) => {
  return {
    onChangeAppTab: ((appTab) => {
      dispatch({
        type: 'CHANGE_APP_TAB',
        payload: appTab
      });
    })
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationTabs);

