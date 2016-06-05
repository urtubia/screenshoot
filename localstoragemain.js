const { ipcMain, BrowserWindow } = require('electron');

let _localStorageWebContents = null;
let _initPromiseAccept = null;
let _initPromise = new Promise((accept, reject) => {
  _initPromiseAccept = accept;
});
let _getRequestPromises = {};

function initPromise()
{
  return _initPromise;
}

function createLocalStorageWindow()
{
  var localStorageWindow = new BrowserWindow({width: 100, height: 100});
  localStorageWindow.hide();
  localStorageWindow.loadURL('file://' + __dirname + '/public/index_localstorage.html');
  return localStorageWindow;
}

ipcMain.on('LOCALSTORAGEMAIN_INIT', (event, args) => {
  _localStorageWebContents = event.sender;
  _initPromiseAccept();  
});

function setItem(key, value) {
  return _localStorageWebContents.send('LOCALSTORAGEMAIN_SETITEM', {
    key: key,
    value: value
  });
}

function getItem(key) {
  let p = _getRequestPromises[key];
  if(p == null){
    var _resolve = null;
    p = new Promise((resolve, reject) => {
      _localStorageWebContents.send('LOCALSTORAGEMAIN_GETITEM', key);
      _resolve = resolve;

      _getRequestPromises[key] = {
        promise:  p,
        resolve: _resolve
      };
    });
    return p;
  }
}

ipcMain.on('LOCALSTORAGEMAIN_GETITEM_RESPONSE', (events, args) => {
  promiseStruct = _getRequestPromises[args.key];
  promiseStruct.resolve(args.value);
});

function removeItem(key) {
  return _localStorageWebContents.send('LOCALSTORAGEMAIN_REMOVEITEM', key);
}

module.exports  = {
  createLocalStorageWindow: createLocalStorageWindow,
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  initPromise: initPromise
};
