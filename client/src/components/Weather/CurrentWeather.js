// Libraries.

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components.

import Summary from './Summary';
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

const CurrentWeather = ({ data, className = '', currentClass = '' }) => {
  const [timeAgo, setTimeAgo] = useState(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const updatedTime = moment(data.dt * 1000);
    setTimeAgo(updatedTime.fromNow());

    setTimeout(() => {
      setRender(!render);
    }, 1000);
  }, [render, data, className, currentClass]);

  return (
    <div className={['wc-current', 'card', 'mb-3', className, currentClass].join(' ')}>
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
              <small className="text-muted">Last updated {timeAgo}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
