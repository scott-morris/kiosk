// Libraries.

import React from 'react';

// Components.

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Summary from './Summary';

// Styles.

// import './HourlyOverview.scss';

// Public.

const HourlyOverview = ({ data, className = '', hourlyOverviewClass = '' }) => {
  return (
    <Row className={['wc-hourlyOverview', className, hourlyOverviewClass].join(' ')}>
      {data.slice(0, 6).map((dayInfo, index) => (
        <Col className="wc-hourly" key={`hourly-${index}`}>
          <Summary weather={dayInfo} />
        </Col>
      ))}
    </Row>
  );
};

export default HourlyOverview;
