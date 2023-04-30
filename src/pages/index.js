import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  configValidation,
  editButton,
  addButton,
  editButtonAvatar,
  fieldInfoName,
  fieldInfoOccupation,
  formEdit,
  formAvatar,
  formAdd
} from '../utils/constants.js';

import './index.css';

// Экземпляр класса для работы с API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c3367b9b-848a-482d-8f8f-edea2d03159c',
    'Content-Type': 'application/json'
  }
});

// Загрука карточек и данных пользователя с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    // Данные пользователя
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    // Вывод карточек
    initialCardList.renderItems(initialCards);
  })
  .catch(err => {
    console.log(err);
  });

// Создание карточки
const createCard = data => {
  const card = new Card(data, userInfo.getUserId(), '.card', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleCardDelete: () => {
      popupDelete.open();
      popupDelete.setElement(card);
    },
    handleCardLike: () => {
      if (!card.isLiked(card._likes, card._userId)) {
        api
          .setLike(card._cardId)
          .then(res => {
            card.toggleLikeCard(res.likes);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api
          .deleteLike(card._cardId)
          .then(res => {
            card.toggleLikeCard(res.likes);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  });

  const element = card.createCard();

  return element;
};

// Экземпляр класса отображения данных пользователя
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__occupation',
  avatar: '.profile__avatar'
});

// Экземпляр попап редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', {
  handleFormSubmit: data => {
    popupEdit.renderLoading(true);
    api
      .setUserInfo({
        name: data['profile-name'],
        about: data['profile-occupation']
      })
      .then(res => {
        userInfo.setUserInfo(res);
        popupEdit.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.renderLoading(false, 'Сохранить');
      });
  }
});

// Экземпляр попап редактирования аватара
const popupAvatar = new PopupWithForm('.popup-avatar', {
  handleFormSubmit: data => {
    popupAvatar.renderLoading(true);

    api
      .updateAvatar(data.avatar)
      .then(res => {
        userInfo.setUserAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false, 'Сохранить');
      });
  }
});

// Экземпляр класса для рисования карточек
const initialCardList = new Section(
  {
    renderer: item => {
      const card = createCard(item);
      initialCardList.addItem(card);
    }
  },
  '.elements__list'
);

// Экземпляр попап добавления карточки
const popupAdd = new PopupWithForm('.popup-add', {
  handleFormSubmit: data => {
    popupAdd.renderLoading(true);

    api
      .createCard(data)
      .then(res => {
        const card = createCard(res);
        initialCardList.addItem(card);
        popupAdd.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupAdd.renderLoading(false, 'Сохранить');
      });
  }
});

// Экземпляр попап удаления выбранной карточки
const popupDelete = new PopupWithConfirm('.popup-delete', {
  handleFormSubmit: (card, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        popupDelete.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupDelete.close();
      });
  }
});

// Экземпляр попап просмотра выбранной карточки
const popupWithImage = new PopupWithImage('.popup-image');

// Экземпляры валидации форм
const formProfileEditValidator = new FormValidator(configValidation, formEdit);
const formAvatarValidator = new FormValidator(configValidation, formAvatar);
const formCardAddValidator = new FormValidator(configValidation, formAdd);

// Устанавливаем валидацию форм
formProfileEditValidator.enableValidation();
formAvatarValidator.enableValidation();
formCardAddValidator.enableValidation();

// Устанавливаем слушатели попапов
popupEdit.setEventListeners();
popupAvatar.setEventListeners();
popupAdd.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();

// Открытие формы редактирования профиля
const handleEditButtonClick = () => {
  const userData = userInfo.getUserInfo();

  fieldInfoName.value = userData.userName;
  fieldInfoOccupation.value = userData.userOccupation;

  popupEdit.initForm(formProfileEditValidator);
};

// Открытие формы редактирования аватара
const handleButtonAvatarClick = () => {
  popupAvatar.initForm(formAvatarValidator);
};

// Открытие формы добавления карточки
const handleAddButtonClick = () => {
  popupAdd.initForm(formCardAddValidator);
};

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
editButtonAvatar.addEventListener('click', handleButtonAvatarClick);
