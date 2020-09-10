// Libraries.

import React from 'react';
import { Chart } from 'react-google-charts';

// Dependencies.

import getClassNames from '../../data/get-class-names';

// Components.

import Row from 'react-bootstrap/Row';

// Styles.

import './HourlyOverview.scss';

// Private.

const NUM_HOURS = 24;

const makeData = (data, titles = [], fields = []) =>
  data.slice(0, NUM_HOURS).reduce(
    (arr, item) => {
      arr.push([new Date(item.dt * 1000)].concat(fields.map((key) => item[key])));
      return arr;
    },
    [[{ type: 'date', label: 'time' }].concat(titles)]
  );

// Public.

const HourlyOverview = ({ data, className = '', hourlyOverviewClass = '' }) => {
  const textStyle = { color: '#ccc' };
  const gridlines = { color: '#666' };
  const minorGridlines = { color: '#333' };

  const hourlyTemperature = data.slice(0, NUM_HOURS).reduce(
    (arr, item) => {
      arr.push([new Date(item.dt * 1000), item.temp, item.feels_like]);
      return arr;
    },
    [[{ type: 'date', label: 'time' }, 'Temperature', 'Feels Like']]
  );

  return (
    <Row className={getClassNames('wc-hourlyOverview', className, hourlyOverviewClass)}>
      <Chart
        data={hourlyTemperature}
        chartType="LineChart"
        options={{
          title: 'Hourly Forecast',
          titleTextStyle: textStyle,
          legend: { textStyle },
          backgroundColor: { fill: '#222' },
          width: 1140,
          height: 400,
          hAxis: { format: 'ha', textStyle, gridlines, minorGridlines },
          vAxis: { format: '#°', textStyle, gridlines, minorGridlines },
        }}
      />
    </Row>
  );
};

export default HourlyOverview;
