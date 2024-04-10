(function () {
  /* Код компонента пишите здесь */
  const form = document.getElementById('booking-form');
  const inputPhone = document.getElementById('phone');

  const classCorrect = 'field-correct';
  const classError = 'field-error';

  /**
   * проверка начинания на +7;
   * проверка на доступные символы
   */
  const phoneRegExpStartNomenclature = /(?:\+7)[()\-\s\d]/;

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

    if (phoneRegExpStartNomenclature.test(input.value)) {
      styleCorrectly(input);
      return true;
    } else {
      styleErroneous(input);
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    validatePhone(inputPhone);
  }

  form.addEventListener('submit', handleSubmit);
})();
