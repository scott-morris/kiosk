// Base Libraries.

import React, { useState } from 'react';

// View Management.

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

// Views.

import Panel1 from './panels/panel-1';
import Panel2 from './panels/panel-2';

// Styles.

import './App.scss';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function App() {
  const [index, setIndex] = useState(0);

  return (
    <div className="App">
      <AutoPlaySwipeableViews index={index} onChangeIndex={setIndex}>
        <Panel1 />
        <Panel2 />
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default App;
