import React from 'react';
import { Provider } from 'react-redux';
import Home from './src/screens/home.js';
import store from './src/store/index.js';

export default class App extends React.Component{
  render(){
    return(
      <Provider store={store} >
        <Home />
      </Provider>
    )
  }
}

