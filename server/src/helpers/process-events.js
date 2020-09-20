// Libraries.

const moment = require('moment');

// Dependencies.

const { containsTime } = require('./dates');

// Private.

const STANDARD_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
const standardDate = (dateString) => moment(dateString).format(STANDARD_DATE_FORMAT);

const uniqueIdentifier = (event) => event.id;

/**
 * Add an Organizer ID used for styling events by source.
 * @param {Array<StandardEvents>} events an array of events without an organizer ID
 * @returns {Array<StandardEvents>}
 */
const addOrganizerId = (events) => {
  const organizers = [];

  return events.map((event) => {
    // Find out if the organizer is already in the array.
    const organizerId = organizers.indexOf(event.organizer);

    // If organizer is already listed, use the index as the ID.
    if (organizerId > -1) {
      return {
        ...event,
        organizerId,
      };
    }

    // If the organizer is not already listed, add them.
    organizers.push(event.organizer);
    return {
      ...event,
      organizerId: organizers.length - 1,
    };
  });
};

// Public.

/**
 * Process the Events sourced from iCloud Calendars.
 * @param {Array<Object>} events The iCloud events from one or more users.
 * @returns {Array<StandardEvents>}
 */
const iCloudEvents = (events) =>
  events.map((event) => ({
    organizer: event.organizer,
    id: event.guid,
    title: event.title,
    description: event.description,
    start: standardDate(event.startDate),
    end: standardDate(event.endDate),
    allDay: event.allDay,
  }));

/**
 * Process the Events sourced from Google Calendars.
 * @param {Array<Object>} events The Google events from one or more users.
 * @returns {Array<StandardEvents>}
 */
const googleEvents = (events) =>
  events.map((event) => {
    const allDay = !containsTime(event.start.date) && !containsTime(event.end.date);
    return {
      organizer: event.organizer.email,
      id: event.id,
      title: event.summary,
      description: event.description,
      start: standardDate(event.start.date),
      end: standardDate(event.end.date),
      allDay,
    };
  });

/**
 * Filter out repeated Events if they appear on more than one calendar.
 * @param {Array<StandardEvents>} events The iCloud events from one or more users.
 * @returns {Array<StandardEvents>}
 */
const standardize = (events) => {
  const ids = new Set();

  // Get unique events by unique identifier.
  const unique = events.filter((event) => {
    const identifier = uniqueIdentifier(event);
    if (ids.has(identifier)) {
      return false;
    }
    ids.add(identifier);
    return true;
  });

  // Return the decorated array.
  return addOrganizerId(unique);
};

module.exports = {
  iCloudEvents,
  googleEvents,
  standardize,
};

/**
 * The standardized Event object
 * @typedef {Object} StandardEvents
 * @property {String} organizer the organizer connected to the event
 * @property {String} id the identifier of the event
 * @property {String} title the title of the event
 * @property {String} description additional event information
 * @property {String} start the start time of the event in `YYYY-MM-DDTHH:mm:ssZ` format
 * @property {String} end the end time of the event in `YYYY-MM-DDTHH:mm:ssZ` format
 * @property {Boolean} allDay flag to show whether this is an "all day" event
 * @property {Number} [organizerId] a numerical identifier for the organizer
 */
