import './scripts/cards.js';
import './pages/index.css';
import './components/card.js';
import './components/validation.js';
import './components/api.js';

import {initialCards} from './scripts/cards.js';
import {closeModal, openModal} from './components/modal.js';
import {createCard, deleteCard, setLike} from './components/card.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import {apiConfig, handleResponse, getUserInfo, getInitialCards, editDataProfile, addNewCard, changeAvatar, errorCheck} from './components/api.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close');
export const cardsContainer = document.querySelector('.places__list');
export const popupImage = document.querySelector('.popup_type_image');
const  cardPopupImage = document.querySelector('.popup__image');
const  captionPopupImage = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');



editButton.addEventListener('click',function() {
    const editForm = document.forms.editprofile;
    editForm.elements.name.value = profileTitle.textContent;
    editForm.elements.description.value = profileDescription.textContent;
    openModal(popupEdit);
    clearValidation(editForm, validationConfig);
  });

addButton.addEventListener('click',() => {
  openModal(popupAdd);
  clearValidation(formElementNewCard, validationConfig);
  });

popupCloseButtons.forEach(
    (item) => {
            const popup = item.closest('.popup');
            item.addEventListener('click',()=> closeModal(popup));
        });


// Находим форму в DOM
export const formElementEdit = document.querySelector('.popup__form-edit');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
export const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()

export const jobInput = document.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function SubmitEditForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    const profileInfoData = {
    name: nameInput.value, 
    about: jobInput.value // Получите значение полей jobInput и nameInput из свойства value
    };
    evt.submitter.textContent = 'Сохранение...';
    editDataProfile(profileInfoData)
    .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(popupEdit);
    })
    .catch(errorCheck)
    .finally(() => {evt.submitter.textContent = 'Сохранить'});
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', SubmitEditForm); 


const formElementNewCard = document.querySelector('.popup__form__new-card');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

function submitNewCardForm(evt){
    evt.preventDefault();
    const card = {
        name : cardName.value,
        link : cardLink.value
    };
    evt.submitter.textContent = 'Сохранение...';
    addNewCard(card)
    .then((data)=>{
      const myId = data.owner._id;
      const cardElement = createCard(data, deleteCard, setLike, showImage,myId);
      cardsContainer.prepend(cardElement);
      formElementNewCard.reset();
      closeModal(popupAdd);
    })
    .catch(errorCheck)
    .finally(() => {evt.submitter.textContent = 'Сохранить'}); 
};

formElementNewCard.addEventListener('submit', submitNewCardForm);


export function showImage(card){
    cardPopupImage.src = card.link;
    cardPopupImage.alt = card.name;
    captionPopupImage.textContent = card.name;
    openModal(popupImage);
  };

 // аватар

const profileImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formElementAvatar = document.querySelector('.popup__form-avatar');
const avatarLinkInput = document.querySelector('.popup__input_type_url-avatar');

function submitNewAvatarForm(evt){
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  const avatarValue =  avatarLinkInput.value;
  changeAvatar(avatarValue)
  .then((response)=>{
    profileImage.style.backgroundImage = `url(${response.avatar})`;
    closeModal(popupAvatar);
    formElementAvatar.reset();
  })
  .catch(errorCheck)
  .finally(() => {evt.submitter.textContent = 'Сохранить'});
}

profileImage.addEventListener('click',function(){
  clearValidation(formElementAvatar, validationConfig);
  openModal(popupAvatar);
  }
);

formElementAvatar.addEventListener('submit', submitNewAvatarForm);

  //VALIDATION
  enableValidation(validationConfig);


// отображение карточек

Promise.all([getUserInfo(),getInitialCards()])
.then( ([userdata, cardsdata]) => {
    profileTitle.textContent = userdata.name;
    profileDescription.textContent = userdata.about;
    profileImage.style.backgroundImage = `url(${userdata.avatar})`;
    const myId = userdata._id;

    cardsdata.forEach((element)=>{
      const cardElement = createCard(element, deleteCard, setLike, showImage, myId);
      cardsContainer.append(cardElement);
  });
})
.catch(errorCheck);



