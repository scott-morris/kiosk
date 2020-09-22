const processEvents = (data) =>
  data.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

module.exports = processEvents;
