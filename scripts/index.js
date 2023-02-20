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
const formEdit = document.querySelector('.popup__form-edit');
const formAdd = document.querySelector('.popup__form-add');
const closeButtonEdit = document.querySelector('.popup__close-edit');
const closeButtonAdd = document.querySelector('.popup__close-add');
const closeButtonImage = document.querySelector('.popup__close-image');
// const elements = document.querySelector('.elements');
const elementsList = document.querySelector('.elements__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Переключение видимости всплывающего окна
const toggleInitialPopup = function (popup) {
  popup.classList.toggle('popup_opened');
};

// Заполнение полей формы данными из профиля
const handleEditButtonClick = function () {
  toggleInitialPopup(popupEdit);
  fieldInfoName.value = profileName.textContent;
  fieldInfoOccupation.value = profileOccupation.textContent;
};

// Сохранение данных профиля
const handleFormEdit = function (evt) {
  evt.preventDefault();
  profileName.textContent = fieldInfoName.value;
  profileOccupation.textContent = fieldInfoOccupation.value;
  toggleInitialPopup(popupEdit);
};

//  Вывод карточек из массива
initialCards.forEach(function (element) {
  elementsList.append(createCard(element.name, element.link));
});

// Создание карточки
function createCard(name, link) {
  const card = document.querySelector('.card').content.querySelector('.element');
  const element = card.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const likeButton = element.querySelector('.element__like-button');
  const recycleButton = element.querySelector('.element__recycle-button');

  element.querySelector('.element__title').textContent = name;
  elementImage.alt = name;
  elementImage.src = link;

  // Слушатель открытия картинки
  elementImage.addEventListener('click', () => handleImageClick(name, link));
  // Слушатель лайка картинки
  likeButton.addEventListener('click', evt =>
    evt.target.classList.toggle('element__like-button_checked')
  );
  // Слушатель удаления картинки
  recycleButton.addEventListener('click', deleteCard);

  return element;
}

const handleImageClick = function (name, link) {
  const image = document.querySelector('.popup__image');
  const subtitle = document.querySelector('.popup__subtitle');

  image.alt = name;
  image.src = link;
  subtitle.textContent = name;

  toggleInitialPopup(popupImage);
};

const saveElement = function () {
  elementsList.prepend(createCard(fieldElementName.value, fieldElementLink.value));
  fieldElementName.value = '';
  fieldElementLink.value = '';
};

// Добавление картинки
const handleFormAdd = function (evt) {
  evt.preventDefault();
  saveElement();
  toggleInitialPopup(popupAdd);
};

// Удаление картинки
function deleteCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', () => toggleInitialPopup(popupAdd));
// closeButton.addEventListener('click', toggleInitialPopup);
closeButtonEdit.addEventListener('click', () => toggleInitialPopup(popupEdit));
closeButtonAdd.addEventListener('click', () => toggleInitialPopup(popupAdd));
closeButtonImage.addEventListener('click', () => toggleInitialPopup(popupImage));
formEdit.addEventListener('submit', handleFormEdit);
formAdd.addEventListener('submit', handleFormAdd);

/* Тест добавления картинки
{
  name: 'Карачаевск',
  link: 'https://images.unsplash.com/photo-1588584922681-745a2223f72c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
}
*/
