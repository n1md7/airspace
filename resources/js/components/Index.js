import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';

if (document.getElementById('airspace')) {
    ReactDOM.render(<MyApp />, document.getElementById('airspace'));
}
