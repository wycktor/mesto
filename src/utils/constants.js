// Заданные карточки
export const initialCards = [
  {
    name: 'Тула',
    link: 'https://sportishka.com/uploads/posts/2022-04/1650720651_14-sportishka-com-p-tula-krasivo-foto-14.jpg'
  },
  {
    name: 'Балаклава',
    link: 'https://static.tildacdn.com/tild3363-3361-4361-b263-303164643262/photo.jpg'
  },
  {
    name: 'Казань',
    link: 'https://sportishka.com/uploads/posts/2022-04/1650703214_61-sportishka-com-p-gorodskoi-okrug-gorod-kazan-krasivo-foto-64.jpg'
  },
  {
    name: 'Сочи',
    link: 'https://s01.cdn-pegast.net/get/50/59/b8/8ae772f9cb59145354ffb5b96bd6ed653088047eacd44d9711040cf756/6260fcb8e3c25.jpg'
  },
  {
    name: 'Ростов Великий',
    link: 'https://tripplanet.ru/wp-content/uploads/europe/russia/rostov-great/spaso-yakovlevsky-monastery.jpg'
  },
  {
    name: 'Санкт Петербург',
    link: 'https://static.guidego.ru/61766d548485caf1ba277fed.1280x960.jpeg'
  }
];

// Конфигуратор валидации форм
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__error_visible'
};

export {
  editButton,
  addButton,
  editButtonAvatar,
  fieldInfoName,
  fieldInfoOccupation,
  formEdit,
  formAvatar,
  formAdd
};

// Необходимые константы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editButtonAvatar = document.querySelector('.profile__avatar-button');
const fieldInfoName = document.querySelector('.popup__field_info_name');
const fieldInfoOccupation = document.querySelector('.popup__field_info_occupation');
const formEdit = document.forms['form-edit'];
const formAvatar = document.forms['form-avatar'];
const formAdd = document.forms['form-add'];
