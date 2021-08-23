import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import About from './pages/about.jsx';
import Product from './pages/product.jsx';
import Features from './pages/features.jsx';
import Home from './pages/index.jsx';
import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import localTracker from './lib/local-tracker';

const App = () => {
  return (
    <UniformTracker trackerInstance={localTracker}>
      <div className='App'>
        <Header />
        <Switch>
          <Route>
            <Route exact path='/' component={Home} />
            <Route exact path='/features' component={Features} />
            <Route exact path='/about' component={About} />
            <Route exact path='/product' component={Product} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </UniformTracker>
  );
};

export default App;
