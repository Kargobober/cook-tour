(function () {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 0,
  };

  /* Код компонента пишите ниже */

  const classForIndicator = 'accordeon-item--open';
  const items = Array.from(document.querySelectorAll('.accordeon-item')).map((item) => ({
    markup: item,
    openingTime: 0,
  }));
  let amountOfOpened = 0;

  function getAmountOfOpened() {
    return items.reduce((acc, li) => {
      if (li.markup.classList.contains(classForIndicator)) {
        acc++;
      }
      return acc;
    }, 0);
  }

  const toggleItem = (togglableItem) => () => {
    // переключаем наличие класса
    togglableItem.markup.classList.toggle(classForIndicator);

    // если после переключения класс есть...
    if (togglableItem.markup.classList.contains(classForIndicator)) {
      // то элемент открывается, запишем таймстамп его открытия
      const currentDate = new Date();
      togglableItem.openingTime = currentDate.getTime();
    } else {
      // иначе элемент закрывается, обнуляем дату его открытия
      togglableItem.openingTime = 0;
    }

    // обновляем счётчик открытых табов
    amountOfOpened = getAmountOfOpened();

    // обработаем превышение открытий
    if (settings.tabsLimit && amountOfOpened > settings.tabsLimit) {
      const currentDate = new Date();
      const indexOfOldest = items.reduce(
        (result, item, index) => {
          if (item.openingTime > 0 && item.openingTime < result.time) {
            result.time = item.openingTime;
            result.indexOfOldest = index;
          }
          return result;
        },
        { time: currentDate.getTime(), indexOfOldest: null }
      ).indexOfOldest;

      toggleItem(items[indexOfOldest])();
    }
  };

  items.forEach((li) => {
    li.markup.querySelector('.accordeon-item-title').addEventListener('click', toggleItem(li));
  });
})();
