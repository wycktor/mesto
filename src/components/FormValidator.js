export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._errorInputList = Array.from(
      this._form.querySelectorAll(`.${this._config.inputErrorClass}`)
    );
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
    this._inputList.forEach(input => {
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

  // Очистка ошибок
  resetValidation() {
    this._errorInputList.forEach(errorInput => {
      this._hideInputError(errorInput);
    });
  }

  // Валидация формы
  enableValidation() {
    this._setEventListeners();
  }
}
