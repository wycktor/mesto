const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const nameField = document.querySelector('.popup__field_info_name');
const occupationField = document.querySelector('.popup__field_info_occupation');
const submit = document.querySelector('.popup__submit');
const closeButton = document.querySelector('.popup__close-button');

const toggleInitialPopup = function () {
  popup.classList.toggle('popup__initial');
};

const handleOverlayClick = function (event) {
  if (event.target === event.currentTarget) {
    toggleInitialPopup();
  }
};

const handleEditButtonClick = function () {
  toggleInitialPopup();
  nameField.value = profileName.textContent;
  occupationField.value = profileOccupation.textContent;
};

const handleSubmit = function (event) {
  event.preventDefault();
  profileName.textContent = nameField.value;
  profileOccupation.textContent = occupationField.value;
  toggleInitialPopup();
};

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', toggleInitialPopup);
submit.addEventListener('click', handleSubmit);
popup.addEventListener('click', handleOverlayClick);
