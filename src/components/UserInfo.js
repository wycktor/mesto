export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._userName = document.querySelector(name);
    this._userOccupation = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // Вернуть данные пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOccupation: this._userOccupation.textContent
    };
  }

  // Установить данные пользователя
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.about;
    this._id = data._id;
  }

  // Обновить аватар пользователя
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getUserId() {
    return this._id;
  }
}
