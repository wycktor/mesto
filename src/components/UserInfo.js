export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._userName = document.querySelector(name);
    this._userOccupation = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // Вернуть данные пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      occupation: this._userOccupation.textContent
    };
  }

  // Установить данные пользователя
  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userOccupation.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

  // Обновить аватар пользователя
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getUserId() {
    return this._id;
  }
}
