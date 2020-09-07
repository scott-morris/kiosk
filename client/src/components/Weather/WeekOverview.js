// Libraries.

import React from 'react';

// Components.

import Col from 'react-bootstrap/Col';
import DayOverview from './DayOverview';
import Row from 'react-bootstrap/Row';

// Styles.

import './WeekOverview.scss';

// Public.

const WeekOverview = ({ dailyData, weeklyClass = '' }) => {
  return (
    <Row className={`wc-week ${weeklyClass}`}>
      {dailyData.map((dayInfo, index) => (
        <Col className="wc-weekday" key={`weekday-${index}`}>
          <DayOverview dayInfo={dayInfo} />
        </Col>
      ))}
    </Row>
  );
};

export default WeekOverview;
