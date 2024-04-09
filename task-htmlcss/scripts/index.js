import { events } from './constants.js';
import { createEvent, eventsExtendingStatus, insertEvent } from './events.js';

const eventsSection = document.querySelector('.events');
const eventsList = eventsSection.querySelector('.events__list');
const eventsElements = events.map((el) => createEvent(el).markup);
const eventsButton = eventsSection.querySelector('.events__button');

function hideOverflowEvents() {
  /* условие для цикла можно брать по числу событий, созданных через фабрику, т.к.
    каждое событие с фабрики мы рендерим на сайте */
  for (let i = 0; i < eventsElements.length; i++) {
    const el = eventsList.children[i];

    if (el.offsetTop > eventsList.clientHeight) {
      el.classList.add('ds-none');
    }
  }
}

function makeEventsVisible() {
  for (let i = 0; i < eventsElements.length; i++) {
    const el = eventsList.children[i];
    el.classList.remove('ds-none');
  }
}

eventsElements.forEach((el) => {
  insertEvent(eventsList, el);
});
hideOverflowEvents();

eventsButton.addEventListener('click', () => {
  if (eventsList.clientHeight === 415 && eventsExtendingStatus.isExtended) {
    throw new Error('Нестыковка. При высоте списка 415px стэйт isExtended должен быть true.');
  }

  eventsExtendingStatus.toggleStatus();
  eventsButton.textContent = eventsExtendingStatus.textForButton;
  eventsButton.classList.toggle('events__button_toggled');

  // если блок свёрнут
  if (eventsList.clientHeight === 415) {
    makeEventsVisible();
    eventsList.style.height = `${eventsList.scrollHeight}px`;
  } else {
    // иначе блок развёрнут и будем его сворачивать
    eventsList.style.height = '415px'; // высота одной карточки с событием
    /* после окончания плавного изменения высоты (0.7s = 700ms) проверяем,
      какие элементы теперь невидимы, и скрываем их от скринридеров, задав display: none */
    setTimeout(hideOverflowEvents, 700);
  }
});

window.addEventListener('resize', () => {
  makeEventsVisible();
  hideOverflowEvents();
  /* данная проверка и сам объект eventsExtendingStatus введён из-за того,
    что высота контейнера иногда становилась больше необходимого, что
    вызывало большие зазоры между карточками
  */
  if (eventsExtendingStatus.isExtended) {
    eventsList.style.height = 'auto';
    eventsList.style.height = `${eventsList.clientHeight}px`;
  }
});
