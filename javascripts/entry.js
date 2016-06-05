//require('../less/main.less');
'use strict';
import ReactDOM from "react-dom";
import React from "react";
import { Provider, connect } from 'react-redux'
import FileList from "./components/FileList"
import { store } from "./store/store"


var App = React.createClass({
  render: function() {
    return (<div>
            <FileList/>
            </div>)
  }
});

var MainComponent = React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
});

ReactDOM.render(<MainComponent/>, document.getElementById('content'));

