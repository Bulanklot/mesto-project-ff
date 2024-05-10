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
export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
export const popupImage = document.querySelector('.popup_type_image');


editButton.addEventListener('click',function() {
    const editForm = document.forms.editprofile;
    editForm.elements.name.value = document.querySelector('.profile__title').textContent;
    editForm.elements.description.value = document.querySelector('.profile__description').textContent;
    formElementEdit.querySelector('.popup__button').textContent = 'Сохранить';
    openModal(popupEdit);
    clearValidation(editForm, validationConfig);
  });

addButton.addEventListener('click',() => {
  formElementNewCard.querySelector('.popup__button').textContent = 'Сохранить';
  openModal(popupAdd);
  formElementNewCard.reset();
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
function editFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    const profileInfoData = {
    name: nameInput.value, 
    about: jobInput.value // Получите значение полей jobInput и nameInput из свойства value
    };

    const title = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description');// Выберите элементы, куда должны быть вставлены значения полей
    
    editDataProfile(profileInfoData)
    .then((data) => {
    title.textContent = data.name;
    description.textContent = data.about;
    })
    .catch(errorCheck);
    formElementEdit.querySelector('.popup__button').textContent = 'Сохранение...';      
   // title.textContent = nameInput.value;
   // description.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
    closeModal(popupEdit);
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', editFormSubmit); 


const formElementNewCard = document.querySelector('.popup__form__new-card');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

function newCardFormSubmit(evt){
    evt.preventDefault();
    const card = {
        name : cardName.value,
        link : cardLink.value
    };
    addNewCard(card)
    .then((data)=>{
      const cardElement = createCard(data, deleteCard, setLike, showImage);
      cardsContainer.prepend(cardElement);
    })
    .catch(errorCheck);
    const popupSubmitButton = formElementNewCard.querySelector('.popup__button');
    popupSubmitButton.textContent = 'Сохранение...';
    formElementNewCard.reset();
    closeModal(popupAdd);
};

formElementNewCard.addEventListener('submit', newCardFormSubmit);

export function showImage(card){
    document.querySelector('.popup__image').src = card.link;
    document.querySelector('.popup__image').alt = card.name;
    document.querySelector('.popup__caption').textContent = card.name;
    openModal(popupImage);
  };

 // аватар

const profileImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formElementAvatar = document.querySelector('.popup__form-avatar');
const avatarLinkInput = document.querySelector('.popup__input_type_url-avatar');

function newAvatarFormSubmit(evt){
  evt.preventDefault();
  const avatarValue =  avatarLinkInput.value;
  changeAvatar(avatarValue)
  .then((response)=>{
    profileImage.style.backgroundImage = `url(${response.avatar})`;
  })
  .catch(errorCheck);
  const popupSubmitButton = formElementAvatar.querySelector('.popup__button');
  popupSubmitButton.textContent = 'Сохранение...';
  closeModal(popupAvatar);
}

profileImage.addEventListener('click',function(){
  formElementAvatar.reset();
  formElementAvatar.querySelector('.popup__button').textContent = 'Сохранить';
  clearValidation(formElementAvatar, validationConfig);
  openModal(popupAvatar);
  }
);

formElementAvatar.addEventListener('submit', newAvatarFormSubmit);

  //VALIDATION
  enableValidation(validationConfig);


// отображение карточек

Promise.all([getUserInfo(),getInitialCards()])
.then( ([userdata, cardsdata]) => {
    document.querySelector('.profile__title').textContent = userdata.name;
    document.querySelector('.profile__description').textContent = userdata.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userdata.avatar})`;
    const myId = userdata._id;

    cardsdata.forEach((element)=>{
     // console.log(element);
      const cardElement = createCard(element, deleteCard, setLike, showImage, myId);
      cardsContainer.append(cardElement);
  });
})
.catch(errorCheck);



