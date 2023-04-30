export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    { handleCardClick, handleCardDelete, handleCardLike }
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  // Шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Настройка слушателей
  _setEventListeners() {
    this._elementImage.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );

    this._likeButton.addEventListener('click', () => this._handleCardLike(this._cardId));

    if (this._isOwned()) {
      this._deleteButton.addEventListener('click', () => this._handleCardDelete(this._cardId));
    }
  }

  // Создание карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._counterLikes = this._element.querySelector('.element__likes');

    if (this._isOwned()) {
      this._deleteButton = this._element.querySelector('.element__recycle-button');
    } else {
      this._element.querySelector('.element__recycle-button').remove();
    }

    this._element.querySelector('.element__title').textContent = this._name;
    this._counterLikes.textContent = this._likes.length;

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._likeCard();
    this._setEventListeners();

    return this._element;
  }

  // Лайк карточки
  _likeCard() {
    if (this.isLiked(this._likes, this._userId)) {
      this._likeButton.classList.toggle('element__like-button_checked');
    }
  }

  isLiked(cardLikes, userId) {
    return cardLikes.some(like => {
      return like._id === userId;
    });
  }

  // Обновление лайков карточки
  toggleLikeCard(likes) {
    this._likes = likes;
    this._counterLikes.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like-button_checked');
  }

  // Определение владельца карточки
  _isOwned() {
    return this._cardOwnerId === this._userId;
  }
}
