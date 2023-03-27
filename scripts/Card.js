import { openPopupImage } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  // Шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Открытие карточки
  _handleImageClick(evt) {
    const data = {
      name: evt.target.alt,
      link: evt.target.src
    };

    openPopupImage(data);
  }

  // Лайк карточки
  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__like-button_checked');
  }

  // Удаление карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // Настройка слушателей
  _setEventListeners() {
    this._elementImage.addEventListener('click', this._handleImageClick);

    this._element
      .querySelector('.element__like-button')
      .addEventListener('click', this._handleLikeCard);

    this._element
      .querySelector('.element__recycle-button')
      .addEventListener('click', () => this._handleDeleteCard());
  }

  // Создание карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
