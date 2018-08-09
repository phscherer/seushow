import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Routes from './Routes';
import reducer from './reducers/index';

class SeuShow extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Routes />
      </Provider>
    );
  }
}

export default SeuShow;