import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._buttonElement = this._popup.querySelector('.popup__submit');
    this._buttonElementText = this._buttonElement.textContent;
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
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._buttonElement.textContent = loadingText;
    } else {
      this._buttonElement.textContent = this._buttonElementText;
    }
  }

  // Установка полей формы
  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }
}
