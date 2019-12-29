import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';
import TracksContextProvider from './tracksContext';

const App = () => {
  return (
    <TracksContextProvider>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/lyrics/track/:id' component={Lyrics} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </TracksContextProvider>
  );
};

export default App;
