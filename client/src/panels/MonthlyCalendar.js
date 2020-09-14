// Libraries.

import React, { useState, useEffect } from 'react';

// Libraries.

import Loading from '../components/Loading';

// Components.

import Calendar from '../components/Calendar/Month';
import Col from 'react-bootstrap/Col';
import DateTime from '../components/DateTime';
import Row from 'react-bootstrap/Row';

// Dependencies.

import apiBase from '../data/api-base';

// Private.

const COLORS = ['green', 'blue', 'red', 'orange'];

const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: COLORS[event.organizerId],
  },
});

// Public.
export default ({ refresh = 60, className }) => {
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetch(`${apiBase}/icloud/events`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setEvents(result);
        },
        (err) => {
          setIsLoading(false);
          setError(err);
        }
      );

    setTimeout(() => {
      setRender(!render);
    }, refresh * 1000);
  }, [refresh, render]);

  return (
    <Loading error={error} isLoading={isLoading}>
      <div className={className}>
        <Row>
          <Col>
            <Calendar events={events} eventStyleGetter={eventStyleGetter} />
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
};
