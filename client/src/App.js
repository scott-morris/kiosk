// Base Libraries.

import React, { useState } from 'react';

// View Management.

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

// Components.

import Calendar from './components/Calendar';
import DateTime from './components/DateTime';

// Styles.

import './App.scss';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function App() {
  const [index, setIndex] = useState(0);

  return (
    <div className="App">
      <AutoPlaySwipeableViews index={index} onChangeIndex={setIndex}>
        <div>
          <Calendar />
          <DateTime />
        </div>
        <div>
          <DateTime />
        </div>
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default App;
