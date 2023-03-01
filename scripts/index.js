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
const addNewCardButton = formAdd.querySelector('.popup__submit_disabled');
const popupList = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elementsList = document.querySelector('.elements__list');
const image = document.querySelector('.popup__image');
const subtitle = document.querySelector('.popup__subtitle');

// Закрытие окна при нажатии клавиши 'Esc'
const closePopupEsc = function (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// Заполнение полей формы данными из профиля
const handleEditButtonClick = function () {
  openPopup(popupEdit);
  fieldInfoName.value = profileName.textContent;
  fieldInfoOccupation.value = profileOccupation.textContent;
};

// Сохранение данных профиля
const handleProfileFormSubmiit = function (evt) {
  evt.preventDefault();
  profileName.textContent = fieldInfoName.value;
  profileOccupation.textContent = fieldInfoOccupation.value;
  closePopup(popupEdit);
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
  image.alt = name;
  image.src = link;
  subtitle.textContent = name;

  openPopup(popupImage);
};

const saveElement = function () {
  elementsList.prepend(createCard(fieldElementName.value, fieldElementLink.value));
};

// Очистка формы после добавления новой карточки
const disableFormAdd = function () {
  addNewCardButton.classList.add('popup__submit_disabled');
  addNewCardButton.setAttribute('disabled', '');
};

// Добавление картинки
const handleFormAdd = function (evt) {
  evt.preventDefault();
  saveElement(evt);
  evt.target.reset();
  closePopup(popupAdd);
  disableFormAdd();
};

// Удаление картинки
function deleteCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

// Закрытие окна по кнопке 'Закрыть'
closeButtons.forEach(button => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Закрытие окна кликом на оверлей
popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
      // Удаление слушателя кнопки 'Esc'
      document.removeEventListener('keydown', closePopupEsc);
    }
  });
});

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', () => openPopup(popupAdd));
formEdit.addEventListener('submit', handleProfileFormSubmiit);
formAdd.addEventListener('submit', handleFormAdd);
