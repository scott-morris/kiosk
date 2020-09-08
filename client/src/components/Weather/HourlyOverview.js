// Libraries.

import React from 'react';
import { d3, LineChart } from 'react-d3-components';
import moment from 'moment';

// Components.

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Styles.

import './HourlyOverview.scss';

// Public.

const HourlyOverview = ({ data, className = '', hourlyOverviewClass = '' }) => {
  let minTemp = Infinity;
  let maxTemp = -Infinity;

  const hourlyData = data.splice(0, 16).reduce(
    ([temp, feelsLike, chanceOfRain], item) => {
      const base = { x: item.dt * 1000 };

      minTemp = Math.min(minTemp, item.temp, item.feels_like);
      maxTemp = Math.max(maxTemp, item.temp, item.feels_like);

      temp.values.push({ ...base, y: item.temp });
      feelsLike.values.push({ ...base, y: item.feels_like });
      chanceOfRain.values.push({ ...base, y: item.pop });

      return [temp, feelsLike, chanceOfRain];
    },
    [
      { label: 'temp', values: [] },
      { label: 'feels like', values: [] },
      { label: 'chance of rain', values: [] },
    ]
  );

  // debugger;
  const yScale = d3.scale
    .linear()
    .domain([maxTemp + 3, minTemp - 3])
    .range([0, 350]);
  const xAxis = {
    label: 'time',
    tickFormat: (t) => moment(t).format('h:mm a'),
  };
  const yAxis = { tickFormat: (t) => t + `°` };

  return (
    <Row className={['wc-hourlyOverview', className, hourlyOverviewClass].join(' ')}>
      <Col>
        <LineChart
          data={hourlyData}
          yScale={yScale}
          xAxis={xAxis}
          yAxis={yAxis}
          width={1000}
          height={400}
          margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
          color={'white'}
        />
      </Col>
      {/* {data.map((dayInfo, index) => (
          <Col className="wc-hourly" key={`hourly-${index}`}>
            <Summary weather={dayInfo} />
          </Col>
        ))} */}
    </Row>
  );
};

export default HourlyOverview;
