export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Запрос к серверу
  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  }

  // Универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options).then(res => this._getResponse(res));
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request('users/me', { headers: this._headers });
  }

  // Редактирование профиля
  setUserInfo(data) {
    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return this._request('cards', { headers: this._headers });
  }

  // Добавление новой карточки
  createCard(data) {
    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // Постановка лайка карточки
  setLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  // Снятие лайка карточки
  deleteLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // Обновление аватара пользователя
  updateAvatar(avatar) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    });
  }
}
