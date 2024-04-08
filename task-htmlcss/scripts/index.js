import { events } from './constants.js';
import { createEvent, insertEvent } from './events.js';

const eventsElements = events.map((el) => createEvent(el).markup);

const eventsList = document.getElementById('eventsList');

eventsElements.forEach((el) => insertEvent(eventsList, el));
