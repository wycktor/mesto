import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._submit = this._popup.querySelector('.popup__submit');
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submit.addEventListener('click', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._element, this._element._cardId);
    });
  }

  setElement(element) {
    this._element = element;
  }
}
