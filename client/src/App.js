// Base Libraries.

import React, { useState } from 'react';

// View Management.

// import SwipeableViews from 'react-swipeable-views';
import Switcher from './components/Switcher';
import { autoPlay } from 'react-swipeable-views-utils';

// Views.

import Panel1 from './panels/panel-1';
import Panel2 from './panels/panel-2';

// Styles.

import './App.scss';

const App = () => (
  <Switcher className="App container" seconds={5}>
    <Panel1 />
    <Panel2 />
  </Switcher>
);

export default App;
