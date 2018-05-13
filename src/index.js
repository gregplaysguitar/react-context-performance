import React from 'react';
import ReactDOM from 'react-dom';
import {AppProps, AppContext} from './App';

console.log(window.location.pathname)
if (window.location.pathname === '/context') {
  ReactDOM.render(<AppContext />, document.getElementById('root'));
} else if (window.location.pathname === '/props') {
  ReactDOM.render(<AppProps />, document.getElementById('root'));
}
