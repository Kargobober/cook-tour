/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const templateEvent = document
  .getElementById('template-event')
  .content.querySelector('.events__item-li');

export function createEvent({ location, duration, name, complexity, img, link }) {
  const newEvent = {};
  newEvent.markup = templateEvent.cloneNode(true);
  const eventLink = newEvent.markup.querySelector('.events__item-link');
  const eventLocation = newEvent.markup.querySelector('.events__location');
  const eventDuration = newEvent.markup.querySelector('.events__duration');
  const eventName = newEvent.markup.querySelector('.events__event-heading');
  const eventComplexityRating = newEvent.markup.querySelector('.rating');

  eventLink.style.backgroundImage = `url(${img})`;
  eventLink.setAttribute('href', link);
  eventLocation.textContent = location;
  eventDuration.textContent = duration;
  eventName.textContent = name;

  let i = 0;
  // ставим картинки заполненных звёздочек
  for (i; i < complexity; i++) {
    eventComplexityRating.children[i].setAttribute('src', './img/icon-rate-star.svg');
  }
  // ставим пустые звёздочки
  for (i; i < 5; i++) {
    eventComplexityRating.children[i].setAttribute('src', './img/icon-rate-star-empty.svg');
  }

  return newEvent;
}

export function insertEvent(destination, event) {
  destination.append(event);
}

export const eventsExtendingStatus = {
  isExtended: false,
  toggleIndicator() {
    this.isExtended = !this.isExtended;
  },
};
