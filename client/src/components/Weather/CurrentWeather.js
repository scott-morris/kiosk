// Libraries.

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Dependencies.

import getClassNames from '../../data/get-class-names';

// Components.

import Summary from './Summary';
import { faLongArrowAltUp, faTint, faTintSlash } from '@fortawesome/free-solid-svg-icons';

// Private.

const Precipitation = ({ time }) => {
  const [timeFromNow, setTimeFromNow] = useState(null);
  const [precipFound, setPrecipFound] = useState(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (time) {
      const updatedTime = moment(time * 1000);
      setPrecipFound(true);
      setTimeFromNow(updatedTime.calendar());
    } else {
      setPrecipFound(false);
      setTimeFromNow('No precipitation in the forecast');
    }

    setTimeout(() => {
      setRender(!render);
    }, 1000);
  }, [render, time]);

  return (
    <span>
      <FontAwesomeIcon
        className="wc-icon wc-precip-icon"
        icon={precipFound ? faTint : faTintSlash}
      />
      {timeFromNow}
    </span>
  );
};

const TimeAgo = ({ time }) => {
  const [timeAgo, setTimeAgo] = useState(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const updatedTime = moment(time * 1000);
    setTimeAgo(updatedTime.fromNow());

    setTimeout(() => {
      setRender(!render);
    }, 1000);
  }, [render, time]);

  return <small className="text-muted">Last updated {timeAgo}</small>;
};

const Wind = ({ speed, direction }) => {
  const arrowStyle = {
    transform: `rotate(${-direction}deg)`,
  };

  return (
    <span className="wc-wind">
      <FontAwesomeIcon
        className="wc-icon wc-windDirection"
        style={arrowStyle}
        icon={faLongArrowAltUp}
      />
      <span className="wc-windSpeed">{speed} mph</span>
    </span>
  );
};

// Public.

const CurrentWeather = ({ data, precipitationTime, className = '', currentClass = '' }) => (
  <div className={getClassNames('wc-current', 'card', 'mb-3', className, currentClass)}>
    <div className="row">
      <Summary className="col-md-4" weather={data} />
      <div className="wc-current-text col-md-8">
        <div className="card-body">
          <h5 className="card-title">Current Weather</h5>
          <p className="card-text">{data.humidity}% humidity</p>
          <p className="card-text">
            <Wind speed={data.wind_speed} direction={data.wind_deg} />
          </p>
          <p className="card-text">
            <Precipitation time={precipitationTime} />
          </p>
          <p className="card-text">
            <TimeAgo time={data.dt} />
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CurrentWeather;
