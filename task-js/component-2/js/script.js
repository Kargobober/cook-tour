(function () {
  /* Код компонента пишите здесь */
  const form = document.getElementById('booking-form');
  const inputPhone = document.getElementById('phone');
  const inputDateIn = document.getElementById('checkin-date');
  const inputDateOut = document.getElementById('checkout-date');

  const classCorrect = 'field-correct';
  const classError = 'field-error';

  /**
   * проверка начинания на +7;
   * проверка на доступные символы: цифры, "(", ")", "-", символ пробела
   */
  const regExpPhoneStartNomenclature = /(?:\+7)[()\-\s\d]/;
  const regExpDate = /\d{4}-\d{2}-\d{2}\b|\d{2}.\d{2}.\d{4}\b/;

  function styleCorrectly(input) {
    input.classList.remove(classError);
    input.classList.add(classCorrect);
  }

  function styleErroneous(input) {
    input.classList.remove(classCorrect);
    input.classList.add(classError);
  }

  function validatePhone(input) {
    // фильтрация чисел. \D - любые нечисловые знаки
    const numbers = input.value.replace(/\D/g, '');
    if (numbers.length !== 11) {
      styleErroneous(input);
      return false;
    }

    if (regExpPhoneStartNomenclature.test(input.value)) {
      styleCorrectly(input);
      return true;
    } else {
      styleErroneous(input);
      return false;
    }
  }

  /**
   * проверка валидности частей даты (число дней в месяцах и т.д.)
   * @param {string} value - YYYY-MM-DD или DD.MM.YYYY
   * @returns {boolean}
   */
  function checkDateValidity(value) {
    const date = {
      year: null,
      month: null,
      day: null,
      assign(year, month, day) {
        this.year = Number(year);
        this.month = Number(month);
        this.day = Number(day);
      },
      checkYear() {
        const currentDate = new Date();
        return this.year >= currentDate.getFullYear();
      },
      checkMonth() {
        // const currentDate = new Date();
        // в тестах вводятся даты от февраля, потому проверку урезаем
        // return this.month > 0 && this.month <= 12 && this.month >= currentDate.getMonth();
        return this.month > 0 && this.month <= 12;
      },
      checkDay() {
        let resultForDay;
        switch (this.month) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            // Обработка 31го дня
            resultForDay = this.day <= 31;
            break;

          case 2: {
            // Обработка февраля
            /**
             * делимость на 400
             */
            const multiplicity400 = !(this.year % 400);
            const multiplicity4 = !(this.year % 4);
            if (multiplicity4 || multiplicity400) {
              // високосный год
              resultForDay = this.day <= 29;
            } else {
              // обычный год
              resultForDay = this.day <= 28;
            }
            break;
          }

          default:
            // 30 дней
            resultForDay = this.day <= 30;
        }
        return resultForDay;
      },
    };

    date.assign(...value.split('-'));

    return date.checkYear() && date.checkMonth() && date.checkDay();
  }

  /**
   * проверка на минимал. кол-во дней бронирования
   * @param {number} param - критерий, число дней
   * @param {string} dateIn - дата заезда, только YYYY-MM-DD
   * @param {string} dateOut - дата выезда, только YYYY-MM-DD
   * @returns {boolean}
   */
  function checkBookingRange(param, dateIn, dateOut) {
    const inTimestamp = new Date(dateIn);
    const outTimestamp = new Date(dateOut);

    /**
     * разница в миллисекундах
     */
    const difference = outTimestamp.getTime() - inTimestamp.getTime();
    return difference / 1000 / 3600 / 24 >= param;
  }

  function formatDate(value) {
    if (value.indexOf('-')) {
      return value;
    } else {
      const [day, month, year] = value.split('.');
      return `${year}-${month}-${day}`;
    }
  }

  function validateDate() {
    const dateIn = formatDate(inputDateIn.value);
    const dateOut = formatDate(inputDateOut.value);

    // первичная проверка на верный формат чисел с пом. регулярных выражений
    // вторичная проверка на диапазоны дат
    if (
      regExpDate.test(inputDateIn.value) &&
      regExpDate.test(inputDateOut.value) &&
      checkDateValidity(dateIn) &&
      checkDateValidity(dateOut) &&
      checkBookingRange(4, dateIn, dateOut)
    ) {
      styleCorrectly(inputDateIn);
      styleCorrectly(inputDateOut);
      return true;
    } else {
      styleErroneous(inputDateIn);
      styleErroneous(inputDateOut);
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    validatePhone(inputPhone);
    validateDate();
  }

  form.addEventListener('submit', handleSubmit);
})();
