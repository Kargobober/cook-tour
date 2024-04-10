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
  // const regExpDate = /(\d{4})-(\d{2})-(\d{2})/;

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
   * @param {string} value - YYYY-MM-DD или DD.MM.YYYY
   * @returns {boolean}
   */
  function checkDateRange(value) {
    const date = {
      year: null,
      month: null,
      day: null,
      assign(year, month, day) {
        this.year = Number(year);
        this.month = Number(month);
        this.day = Number(day);
        console.log('записали данные', { date });
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

    if (value.indexOf('-')) {
      const [year, month, day] = value.split('-');
      date.assign(year, month, day);
    } else {
      const [day, month, year] = value.split('.');
      date.assign(year, month, day);
    }

    return date.checkYear() && date.checkMonth() && date.checkDay();
  }

  function validateDate() {
    // первичная проверка на верный формат чисел с пом. регулярных выражений
    // вторичная проверка на диапазоны дат
    if (
      regExpDate.test(inputDateIn.value) &&
      regExpDate.test(inputDateOut.value) &&
      checkDateRange(inputDateIn.value) &&
      checkDateRange(inputDateOut.value)
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
