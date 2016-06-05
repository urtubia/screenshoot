'use strict';
import * as Redux from 'redux';
import { ipcRenderer } from 'electron';

const initialState = {
  fileList: [],
};

function reducer(state = initialState, action)
{
  console.log(state);
  switch(action.type){
    case 'ADD_FILE':
      var matchingFiles = state.fileList.filter(file => { return file.path == action.payload.path;});
      if(matchingFiles.length > 0){
        return state;
      }else{
        return { ...state, 
          fileList: [...state.fileList, action.payload]
        };
      }
    case 'ADD_FILES':
      let fileList = state.fileList;
      action.payload.forEach(file => {
        let matchingFiles = fileList.filter(file => { return file.path == action.payload.path;});
        if(matchingFiles.length == 0){
          fileList.push(file);
        }
      });

      return { ...state,
        fileList: fileList
      }

    default:
      return state;
  }
}

var store = Redux.createStore(reducer);

ipcRenderer.send('INITIAL_FILES_REQUEST');

ipcRenderer.on('INITIAL_FILES_RESPONSE', (event, payload) => {
  console.log(payload);
  store.dispatch({
    type: 'ADD_FILES',
    payload: payload
  });
});

ipcRenderer.on('FILE_ADDED', (event, payload) => {
  store.dispatch({
    type: 'ADD_FILE',
    payload: payload
  });
});


module.exports = {
  store: store,
};
