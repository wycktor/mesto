// Конфигуратор валидации форм
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__error_visible'
};

export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  }

  // Отображение сообщения ошибки
  _showInputError(errorElement, input) {
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = input.validationMessage;
  }

  // Скрытие сообщения ошибки
  _hideInputError(errorElement) {
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  // Состояния кнопки 'submit'
  _toggleButtonState() {
    const isFormValid = this._form.checkValidity();

    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(this._config.inactiveButtonClass, !isFormValid);
  }

  // Проверка отображения/скрытия сообщения ошибки при валидации формы
  _checkValidityInput(input) {
    const inputName = input.name;
    const errorElement = this._form.querySelector(`.${inputName}-error`);

    if (input.validity.valid) {
      this._hideInputError(errorElement);
    } else {
      this._showInputError(errorElement, input);
    }
  }

  // Валидность поля ввода
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkValidityInput(input);
        this._toggleButtonState();
      });
    });
  }

  // Очистка формы после добавления новой карточки
  disableSubmitButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

  // Сброс ошибок формы
  resetErrorInput() {
    const errorInputList = this._form.querySelectorAll(`.${this._config.inputErrorClass}`);

    errorInputList.forEach(errorInput => {
      this._hideInputError(errorInput);
    });
  }

  // Валидация формы
  enableValidation() {
    this._setEventListeners();
  }
}
