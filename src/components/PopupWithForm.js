import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._buttonElement = this._popup.querySelector('.popup__submit');
  }

  // Собрать данные формы
  _getInputValues() {
    const formInputValues = {};

    this._inputList.forEach(input => {
      formInputValues[input.name] = input.value;
    });

    return formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, textContent) {
    if (isLoading) {
      this._buttonElement.textContent = 'Сохранение...';
    } else {
      this._buttonElement.textContent = textContent;
    }
  }

  initForm(formValidator) {
    this.open();
    formValidator.resetValidation();
    formValidator.disableSubmitButton();
  }
}
