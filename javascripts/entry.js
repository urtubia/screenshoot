//require('../less/main.less');
'use strict';
import ReactDOM from "react-dom";
import React from "react";
import * as Redux from 'redux';
require('./screenshoot.js');

const initialState = {
  fileList: [],
};

function reducer(state = initialState, action)
{
  switch(action.type){
    case 'ADD_FILE':
      return { ...state, 
        fileList: [...state.fileList, action.payload]
      };
    default:
      return state;
  }
}

var store = Redux.createStore(reducer);

var MainComponent = React.createClass({
  componentDidMount: () => {

  },

  render: () => {
    return (
      <div>Whatuuup</div>
    );
  }

});

ReactDOM.render(<MainComponent/>, document.getElementById('content'));

