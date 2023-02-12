const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const nameField = document.querySelector('.popup__field_info_name');
const occupationField = document.querySelector('.popup__field_info_occupation');
const formSubmit = document.querySelector('.popup__form');
const closeButton = document.querySelector('.popup__close-button');

// Переключение видимости формы редактирования
const toggleInitialPopup = function () {
  popup.classList.toggle('popup_opened');
};

// Заполнение полей формы данными из профиля
const handleEditButtonClick = function () {
  toggleInitialPopup();
  nameField.value = profileName.textContent;
  occupationField.value = profileOccupation.textContent;
};

// Сохранение данных профиля
const handleFormSubmit = function (event) {
  event.preventDefault();
  profileName.textContent = nameField.value;
  profileOccupation.textContent = occupationField.value;
  toggleInitialPopup();
};

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', toggleInitialPopup);
formSubmit.addEventListener('submit', handleFormSubmit);
