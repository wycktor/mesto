import Card from './Card.js';
import FormValidator, { configValidation } from './FormValidator.js';
import { initialCards } from './initialCards.js';

export { openPopupImage };

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');
const fieldInfoName = document.querySelector('.popup__field_info_name');
const fieldInfoOccupation = document.querySelector('.popup__field_info_occupation');
const fieldElementName = document.querySelector('.popup__field_element_name');
const fieldElementLink = document.querySelector('.popup__field_element_link');
const formEdit = document.forms['form-edit'];
const formAdd = document.forms['form-add'];
const popupList = document.querySelectorAll('.popup');
const elementsList = document.querySelector('.elements__list');
const image = document.querySelector('.popup__image');
const subtitle = document.querySelector('.popup__subtitle');

// Экземпляры валидации форм
const formProfileEditValidator = new FormValidator(configValidation, formEdit);
const formCardAddValidator = new FormValidator(configValidation, formAdd);

// Устанавливаем валидацию форм
formProfileEditValidator.enableValidation();
formCardAddValidator.enableValidation();

// Закрытие окна при нажатии клавиши 'Esc'
const closePopupEsc = evt => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// Открытие попап
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

// Закрытие попап
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// Открытие формы редактирования профиля
const handleEditButtonClick = () => {
  openPopup(popupEdit);
  formProfileEditValidator.resetErrorInput();
  fieldInfoName.value = profileName.textContent;
  fieldInfoOccupation.value = profileOccupation.textContent;
};

// Открытие формы добавления карточки
const handleAddButtonClick = () => {
  openPopup(popupAdd);
  formCardAddValidator.resetErrorInput();
};

// Открытие выбранной карточки
const openPopupImage = data => {
  image.alt = data.name;
  image.src = data.link;
  subtitle.textContent = data.name;

  openPopup(popupImage);
};

// Сохранение данных профиля
const handleProfileFormSubmiit = evt => {
  evt.preventDefault();
  profileName.textContent = fieldInfoName.value;
  profileOccupation.textContent = fieldInfoOccupation.value;
  closePopup(popupEdit);
};

//  Вывод карточек из массива
initialCards.forEach(element => {
  const card = createCard(element);

  elementsList.append(card);
});

// Добавление новой карточки
const handleFormAdd = evt => {
  evt.preventDefault();
  handleAddCard();
  formCardAddValidator.disableSubmitButton();
  formAdd.reset();
  closePopup(popupAdd);
};

// Закрытие окна кликом на оверлей и по кнопке 'Закрыть'
popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (
      evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  });
});

// Создание карточки
function createCard(data) {
  const card = new Card(data, '.card');
  const element = card.createCard();

  return element;
}

// Добавление карточки в контейнер
function handleAddCard() {
  const data = {};

  data.name = fieldElementName.value;
  data.link = fieldElementLink.value;

  const card = createCard(data);

  elementsList.prepend(card);
}

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
formEdit.addEventListener('submit', handleProfileFormSubmiit);
formAdd.addEventListener('submit', handleFormAdd);
