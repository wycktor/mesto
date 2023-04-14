import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  configValidation,
  editButton,
  addButton,
  fieldInfoName,
  fieldInfoOccupation,
  formEdit,
  formAdd
} from '../utils/constants.js';

// Класс отображения данных пользователя
const userInfo = new UserInfo({ name: '.profile__name', occupation: '.profile__occupation' });

// Создание карточки
const createCard = data => {
  const card = new Card(data, '.card', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  });

  const element = card.createCard();

  return element;
};

// Экземпляр попап редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', {
  handleFormSubmit: data => {
    userInfo.setUserInfo({
      name: data['profile-name'],
      occupation: data['profile-occupation']
    });
  }
});

// Экземпляр попап добавления карточки
const popupAdd = new PopupWithForm('.popup-add', {
  handleFormSubmit: data => {
    const card = createCard(data);
    initialCardList.addItem(card);
  }
});

// Экземпляр попап просмотра выбранной карточки
const popupWithImage = new PopupWithImage('.popup-image');

// Экземпляры валидации форм
const formProfileEditValidator = new FormValidator(configValidation, formEdit);
const formCardAddValidator = new FormValidator(configValidation, formAdd);

// Устанавливаем валидацию форм
formProfileEditValidator.enableValidation();
formCardAddValidator.enableValidation();

// Устанавливаем слушатели попапов
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupWithImage.setEventListeners();

// Открытие формы редактирования профиля
const handleEditButtonClick = () => {
  const userData = userInfo.getUserInfo();

  fieldInfoName.value = userData.userName;
  fieldInfoOccupation.value = userData.userOccupation;

  popupEdit.open();
  formProfileEditValidator.resetValidation();
  formProfileEditValidator.disableSubmitButton();
};

// Открытие формы добавления карточки
const handleAddButtonClick = () => {
  popupAdd.open();
  formCardAddValidator.resetValidation();
  formCardAddValidator.disableSubmitButton();
};

//  Вывод карточек из массива
const initialCardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = createCard(item);
      initialCardList.addItem(card);
    }
  },
  '.elements__list'
);

initialCardList.renderItems();

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
