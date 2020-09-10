// Libraries.

import React from 'react';

// Dependencies.

import getClassNames from '../../data/get-class-names';

// Components.

import Col from 'react-bootstrap/Col';
import DayOverview from './DayOverview';
import Row from 'react-bootstrap/Row';

// Styles.

import './WeekOverview.scss';

// Public.

const WeekOverview = ({ data, className = '', weeklyClass = '' }) => {
  return (
    <Row className={getClassNames('wc-week', className, weeklyClass)}>
      {data.slice(0, 6).map((dayInfo, index) => (
        <Col className="wc-weekday" key={`weekday-${index}`}>
          <DayOverview dayInfo={dayInfo} />
        </Col>
      ))}
    </Row>
  );
};

export default WeekOverview;
