export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Закрытие окна при нажатии клавиши 'Esc'
  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  // Открытие попап
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие окна кликом на оверлей и по кнопке 'Закрыть'
  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close-button')
      ) {
        this.close();
      }
    });
  }
}
