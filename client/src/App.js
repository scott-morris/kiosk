// Base Libraries.

import React from 'react';

// View Management.

// import SwipeableViews from 'react-swipeable-views';
import Switcher from './components/Switcher';

// Views.

import MonthlyCalendar from './panels/MonthlyCalendar';
import Weather from './panels/Weather';

// Styles.

import './App.scss';

const App = () => (
  <Switcher className="App container" seconds={10}>
    <Weather />
    <MonthlyCalendar />
  </Switcher>
);

export default App;
