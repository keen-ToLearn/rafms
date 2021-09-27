import React, { Component } from 'react';
import HomeMain from './components/HomeMainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <HomeMain/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
