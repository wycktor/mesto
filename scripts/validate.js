const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__error_visible'
};

// Отображение сообщения ошибки
const showInputError = (errorElement, errorClass, input) => {
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
};

// Скрытие сообщения ошибки
const hideInputError = (errorElement, errorClass) => {
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Проверка отображения/скрытия сообщения ошибки при валидации формы
const checkValidityInput = (form, settings, input) => {
  const inputName = input.name;
  const spanError = form.querySelector(`.${inputName}-error`);

  if (input.validity.valid) {
    hideInputError(spanError, settings.errorClass);
  } else {
    showInputError(spanError, settings.errorClass, input);
  }
};

// Валидность поля ввода
const setEventListeners = (form, settings) => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));

  inputList.forEach(item => {
    item.addEventListener('input', () => checkValidityInput(form, settings, item));
  });
};

// Состояния кнопки 'submit'
const toggleButtonState = (form, settings) => {
  const submit = form.querySelector(settings.submitButtonSelector);
  const isFormValid = form.checkValidity();
  submit.disabled = !isFormValid;
  submit.classList.toggle(settings.inactiveButtonClass, !isFormValid);
};

// Валидация формы
const enableValidation = settings => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Валидация полей
  formList.forEach(form => {
    form.addEventListener('input', () => {
      toggleButtonState(form, settings);
    });

    setEventListeners(form, settings);
  });
};

// Сброс ошибок формы
const resetErrorFied = (form, inputList, errorClass) => {
  const fieldList = Array.from(form.querySelectorAll(inputList));

  fieldList.forEach(input => {
    const inputName = input.name;
    const spanError = form.querySelector(`.${inputName}-error`);

    hideInputError(spanError, errorClass);
  });
};

enableValidation(validationSettings);
