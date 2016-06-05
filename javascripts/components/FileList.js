import { Provider, connect } from 'react-redux'
import React from "react";

var FileList = React.createClass({
  render: function() {
    let filesAsList = [];
    if(this.props.fileList){
      let fileList = this.props.fileList.slice();
      fileList.sort((a, b) => {
        return a.birthtime < b.birthtime;
      });
      filesAsList = fileList.map(file => {
        if(file.url != null){
          return <li key={file.path}>{ file.path } - <b>{ file.url }</b></li>;
        }
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

