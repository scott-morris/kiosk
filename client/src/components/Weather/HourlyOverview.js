// Libraries.

import React from 'react';
import { Chart } from 'react-google-charts';

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
  const chartStyle = {
    titleTextStyle: { color: 'white' },
    backgroundColor: { fill: '#222' },
    width: 1140,
    height: 400,
    legend: { textStyle },
    hAxis: { format: 'ha', textStyle, gridlines, minorGridlines },
  };

  const hourlyTemperature = data.slice(0, NUM_HOURS).reduce(
    (arr, item) => {
      arr.push([new Date(item.dt * 1000), item.temp, item.feels_like]);
      return arr;
    },
    [[{ type: 'date', label: 'time' }, 'Temperature', 'Feels Like']]
  );

  const hourlyPrecipitation = data.slice(0, NUM_HOURS).reduce(
    (arr, item) => {
      arr.push([item.pop, new Date(item.dt * 1000)]);
      return arr;
    },
    [['Precip', { type: 'date' }]]
  );

  return (
    <>
      <Row className={['wc-hourlyOverview', className, hourlyOverviewClass].join(' ')}>
        <Chart
          data={hourlyTemperature}
          chartType="LineChart"
          options={{
            ...chartStyle,
            title: 'Hourly Forecast',
            vAxis: { format: '#°F', textStyle, gridlines, minorGridlines },
          }}
        />
      </Row>
      <Row>
        <Chart
          data={hourlyPrecipitation}
          chartType="BarChart"
          options={{
            ...chartStyle,
            title: 'Chance of Precipitation',
            vAxis: { format: '#"', viewWindow: { min: 0 }, textStyle, gridlines, minorGridlines },
          }}
        />
      </Row>
    </>
  );
};

export default HourlyOverview;
