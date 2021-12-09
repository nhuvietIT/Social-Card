
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import SocialCardsApi from './api/socialCardApi'
import { SocialCard } from './features/social-card/components/socialCard'; 
import './App.css';
import { Counter } from './features/counter/Counter';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <SocialCard />
        {/* <Counter /> */}
      </header>
    </div>
  );
}

export default App;
