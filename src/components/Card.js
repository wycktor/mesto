export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Лайк карточки
  _handleLikeCard() {
    this._likeButton.classList.toggle('element__like-button_checked');
  }

  // Удаление карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // Настройка слушателей
  _setEventListeners() {
    this._elementImage.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );

    this._likeButton.addEventListener('click', () => this._handleLikeCard());

    this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
  }

  // Создание карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__recycle-button');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
