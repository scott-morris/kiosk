// Libraries.

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components.

import Icon from './Icon';
import Temperature from './Temperature';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';

// Styles.

import './CurrentWeather.scss';

// Private.

const Wind = ({ speed, direction }) => {
  const arrowStyle = {
    transform: `rotate(${-direction}deg)`,
  };

  return (
    <span className="wc-wind">
      <FontAwesomeIcon className="wc-windDirection" style={arrowStyle} icon={faLongArrowAltUp} />
      <span className="wc-windSpeed">{speed} mph</span>
    </span>
  );
};

// Public.

const CurrentWeather = ({ weather, className = '', currentClass = '' }) => {
  const [timeAgo, setTimeAgo] = useState(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const updatedTime = moment(weather.dt * 1000);
    setTimeAgo(updatedTime.fromNow());

    setTimeout(() => {
      setRender(!render);
    }, 1000);
  }, [render, weather, className, currentClass]);

  return (
    <div className={['wc-current', 'card', 'mb-3', className, currentClass].join(' ')}>
      <div className="row no-gutters">
        <div className="wc-current-summary col-md-4">
          <Icon weather={weather.weather} />
          <Temperature className="wc-current-temp" temp={weather.temp} />
          <Temperature className="wc-current-feels-like" temp={weather.feels_like} />
        </div>
        <div className="wc-current-text col-md-8">
          <div className="card-body">
            <h5 className="card-title">Current Weather</h5>
            <p className="card-text">{weather.humidity}% humidity</p>
            <p className="card-text">
              <Wind speed={weather.wind_speed} direction={weather.wind_deg} />
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated {timeAgo}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
