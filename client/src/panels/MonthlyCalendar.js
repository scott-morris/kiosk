// Libraries.

import React from 'react';

// Libraries.

import Loading from '../components/Loading';

// Components.

import Calendar from '../components/Calendar/Month';
import Col from 'react-bootstrap/Col';
import DateTime from '../components/DateTime';
import Row from 'react-bootstrap/Row';

// Private.

const COLORS = ['green', 'blue', 'red', 'orange'];

const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: COLORS[event.organizerId],
  },
});

// Public.

export default ({ data, error, isLoading, className }) => (
  <Loading error={error} isLoading={isLoading}>
    <div className={className}>
      <Row>
        <Col>
          <Calendar events={data} eventStyleGetter={eventStyleGetter} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DateTime />
        </Col>
        <Col></Col>
      </Row>
    </div>
  </Loading>
);
