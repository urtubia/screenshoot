//require('../less/main.less');
'use strict';
import ReactDOM from "react-dom";
import React from "react";
import { Provider, connect } from 'react-redux'
import { store } from "./store/store"
import App from "./components/App"

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

