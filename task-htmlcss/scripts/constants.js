class Event {
  constructor(location, duration, name, complexity, img, link) {
    this.location = location;
    this.duration = duration;
    this.name = name;
    this.complexity = complexity;
    this.img = `./img/${img}`;
    this.link = link;
  }
}

const aroundCaucasus = new Event(
  'Кавказ',
  '4 дня',
  'Гастрономическое путешествие вокруг Кавказа',
  3,
  'around-caucasus.png',
  '/cupiSlona'
);

const altayPathToMaster = new Event(
  'Алтай',
  '13 дней',
  'Путь к мастерству в приготовлении блюд Алтая',
  2,
  'altay-path-to-master.png',
  '/cupiShmelya'
);

const adigeyaMountSea = new Event(
  'Адыгея',
  '6 дней',
  'От горных трав до морских деликатесов',
  4,
  'adigeya-mount-sea.png',
  '/cupiMorzha'
);

const yetAnotherEv = new Event(
  'Пекин',
  '17 дней',
  'Утка. Рис. Сверчок',
  3,
  'altay-path-to-master.png',
  '/cupi'
);

const chumay = new Event(
  'Чумай',
  '600 дней',
  'От калашмы до кавармы',
  5,
  'chumay.png',
  '/cupiKagor'
);

export const events = [aroundCaucasus, altayPathToMaster, adigeyaMountSea, yetAnotherEv, chumay];
