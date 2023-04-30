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
