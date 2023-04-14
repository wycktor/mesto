export default class UserInfo {
  constructor({ name, occupation }) {
    this._userName = document.querySelector(name);
    this._userOccupation = document.querySelector(occupation);
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
    this._userOccupation.textContent = data.occupation;
  }
}
