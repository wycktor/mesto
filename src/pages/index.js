import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import { configValidation, editButton, addButton, editButtonAvatar } from '../utils/constants.js';

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

// Экземпляр класса отображения данных пользователя
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__occupation',
  avatar: '.profile__avatar'
});

// Универсальная функция, принимающая функцию запроса,  экземпляр попапа и текст во время загрузки (опционально)
function handleSubmit(request, popupInstance, loadingText = 'Сохранение...') {
  // изменяем текст кнопки до вызова запроса
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      // закрывать попап нужно только в `then`
      popupInstance.close();
    })
    .catch(err => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// Экземпляр попап редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', {
  handleFormSubmit: inputValues => {
    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
    function makeRequest() {
      // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
      return api
        .setUserInfo({
          name: inputValues['name'],
          about: inputValues['occupation']
        })
        .then(userData => {
          userInfo.setUserInfo(userData);
        });
    }
    // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
    handleSubmit(makeRequest, popupEdit);
  }
});

// Экземпляр попап редактирования аватара
const popupAvatar = new PopupWithForm('.popup-avatar', {
  handleFormSubmit: inputValues => {
    function makeRequest() {
      return api.updateAvatar(inputValues.avatar).then(userAvatar => {
        userInfo.setUserAvatar(userAvatar.avatar);
      });
    }
    handleSubmit(makeRequest, popupAvatar);
  }
});

// Экземпляр попап добавления карточки
const popupAdd = new PopupWithForm('.popup-add', {
  handleFormSubmit: inputValues => {
    function makeRequest() {
      return api.createCard(inputValues).then(userCard => {
        initialCardList.addItem(createCard(userCard));
      });
    }
    handleSubmit(makeRequest, popupAdd);
  }
});

// Экземпляр попап удаления выбранной карточки
const popupDelete = new PopupWithConfirmation('.popup-delete', {
  handleFormSubmit: (card, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        popupDelete.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// Экземпляр попап просмотра выбранной карточки
const popupWithImage = new PopupWithImage('.popup-image');

// Экземпляры валидаторов всех форм
const formValidators = {};

// Включение валидации форм
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configValidation);

// Устанавливаем слушатели попапов
popupEdit.setEventListeners();
popupAvatar.setEventListeners();
popupAdd.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();

// Открытие формы редактирования профиля
const handleEditButtonClick = () => {
  const userData = userInfo.getUserInfo();
  popupEdit.setInputValues(userData);
  initForm(popupEdit, formValidators['form-edit']);
};

// Открытие формы редактирования аватара
const handleButtonAvatarClick = () => {
  initForm(popupAvatar, formValidators['form-avatar']);
};

// Открытие формы добавления карточки
const handleAddButtonClick = () => {
  initForm(popupAdd, formValidators['form-add']);
};

// Инициализация окон с формами
const initForm = (form, formValidator) => {
  form.open();
  formValidator.resetValidation();
  formValidator.disableSubmitButton();
};

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
editButtonAvatar.addEventListener('click', handleButtonAvatarClick);
