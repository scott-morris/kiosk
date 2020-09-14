// Libraries.

const moment = require('moment');

// Private.

const beginningOfLastMonth = () => {
  return moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
};

const endOfNextMonth = () => {
  return moment().add(1, 'month').endOf('month').format('YYYY-MM-DD');
};

const getAllEvents = (iCloudSessions, startDate, endDate) => {
  const events = iCloudSessions.map((session) => session.Calendar.getEvents(startDate, endDate));

  return Promise.all(events).then((...results) => results.flat());
};

// Public.

const middleware = (iCloudSessions, options) => async (req, res, next) => {
  const startDate = req.query.startDate || beginningOfLastMonth();
  const endDate = req.query.endDate || endOfNextMonth();
  const rawEvents = await getAllEvents(iCloudSessions, startDate, endDate);

  const guids = new Set();
  const organizers = [];
  const events = rawEvents
    .filter((event) => {
      if (guids.has(event.guid)) {
        return false;
      }
      guids.add(event.guid);
      return true;
    })
    .map((event) => {
      const organizerId = organizers.indexOf(event.organizer);
      if (organizerId > -1) {
        return {
          ...event,
          organizerId,
        };
      }

      organizers.push(event.organizer);
      return {
        ...event,
        organizerId: organizers.length - 1,
      };
    });
  res.json(events);
};

module.exports = middleware;
