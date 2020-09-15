// Public.

const getAllEvents = (iCloudSessions, startDate, endDate) => {
  const events = iCloudSessions.map((session) => session.Calendar.getEvents(startDate, endDate));

  return Promise.all(events).then((...results) => results.flat());
};

const dedupeEvents = (events) => {
  const guids = new Set();
  const organizers = [];

  return events
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
};

const getUniqueEvents = (iCloudSessions, startDate, endDate) => {
  const allEvents = getAllEvents(iCloudSessions, startDate, endDate);
  return dedupeEvents(allEvents);
};

module.exports = {
  getAllEvents,
  dedupeEvents,
  getUniqueEvents,
};
