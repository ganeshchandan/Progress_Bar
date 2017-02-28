import ReactDOM from 'react-dom';
import React from 'react';
import Home from './components/Home';

require('../styles/base.scss'); //Yeah, require CSS!!!

ReactDOM.render(
  <Home />, document.getElementById('content')
);
