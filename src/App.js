// App Main Component

/**
 * Module dependencies.
 */

import React, { Component } from 'react';
import './staticAssets/css/style.css';
import Header from '../src/components/Header';
import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import localTracker from './lib/local-tracker';

class App extends Component {
  render() {
    return (
      <UniformTracker trackerInstance={localTracker}>
        <div className="App">
          <Header />
        </div>
      </UniformTracker>
    );
  }
}

export default App;
