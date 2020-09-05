// Libraries.

const moment = require('moment');

// Private.

const beginningOfLastMonth = () =>
  moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
const endOfNextMonth = () => moment().add(1, 'month').endOf('month').format('YYYY-MM-DD');

// Public.

const middleware = (iCloudSession, options) => async (req, res, next) => {
  const startDate = req.query.startDate || beginningOfLastMonth();
  const endDate = req.query.endDate || endOfNextMonth();
  const rawEvents = await iCloudSession.Calendar.getEvents(startDate, endDate);

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
