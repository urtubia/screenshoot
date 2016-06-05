import { Provider, connect } from 'react-redux'
import React from "react";

var FileList = React.createClass({
  render: function() {
    let filesAsList = [];
    if(this.props.fileList){
      filesAsList = this.props.fileList.map(file => {
        return <li key={file.path}>{ file.path }</li>
      });
    }

    return <div>
            The files are:
            <ol>{ filesAsList }</ol>
          </div>
  }
});

var mapStateToProps = (state, ownProps) => {
  return state;
};

module.exports = connect(mapStateToProps)(FileList);

