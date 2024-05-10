import './scripts/cards.js';
import './pages/index.css';
import './components/card.js';
import './components/validation.js';

import {initialCards} from './scripts/cards.js';
import {closeModal, openModal} from './components/modal.js';
import {createCard, deleteCard, setLike} from './components/card.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close');
export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
export const popupImage = document.querySelector('.popup_type_image');

//initialCards.forEach(function(card){
//  const cardElement = createCard(card, deleteCard, setLike, showImage);
  //  cardsContainer.append(cardElement);
//  });



editButton.addEventListener('click',function() {
    const editForm = document.forms.editprofile;
    editForm.elements.name.value = document.querySelector('.profile__title').textContent;
    editForm.elements.description.value = document.querySelector('.profile__description').textContent;
    openModal(popupEdit);
    clearValidation(editForm, validationConfig);
  });

addButton.addEventListener('click',() => {
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
    const zaprosData = {
    name: nameInput.value, 
    about: jobInput.value // Получите значение полей jobInput и nameInput из свойства value
    };

    const title = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description');// Выберите элементы, куда должны быть вставлены значения полей
    editDataProfile(zaprosData)
    .then((data) => {
    title.textContent = data.name;
    description.textContent = data.about;
    });      
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
      console.log(data);
      const cardElement = createCard(data, deleteCard, setLike, showImage);
      cardsContainer.prepend(cardElement);
    });
    //const cardElement = createCard(card, deleteCard, setLike, showImage);
    //cardsContainer.prepend(cardElement);
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
const avatarLinkInput = document.querySelector(`.popup__input_type_url-avatar`);


function newAvatarFormSubmit(evt){
  evt.preventDefault();
  const avatarValue =  avatarLinkInput.value;
  //console.log(avatarValue);
  changeAvatar(avatarValue)
  .then((response)=>{
    console.log(response);
    profileImage.style.backgroundImage = `url(${response})`;
  });
  closeModal(popupAvatar);
}

profileImage.addEventListener('click',function(){
  formElementAvatar.reset();
  clearValidation(formElementAvatar, validationConfig);
  openModal(popupAvatar);
  }
);

formElementAvatar.addEventListener('submit', newAvatarFormSubmit);

  //VALIDATION
  enableValidation(validationConfig);

// API
const apiConfig = {
  url : 'https://mesto.nomoreparties.co/v1/wff-cohort-12' ,
  token: '2e3048b1-c103-405c-8f6d-2f119dda7be2'
};


const handleResponse = (response) =>{
  if(response.ok){
    return response.json();
  }
 };

  // Как сделать запрос к серверу

/* fetch(`${apiConfig.url}/cards/`, {
 headers: {
   authorization : apiConfig.token
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
 */

  // Загрузка информации о пользователе с сервера
const getUserInfo = ()=> {
  return fetch(`${apiConfig.url}/users/me`, 
{ method: 'GET',
  headers: {authorization : apiConfig.token}
})
.then(handleResponse);
};

// Загрузка карточек с сервера

const getInitialCards = () =>{
return fetch(`${apiConfig.url}/cards`, {
  headers: {
    authorization: apiConfig.token
  }
})
  .then(handleResponse)
};

// отображение карточек

Promise.all([getUserInfo(),getInitialCards()])
.then( ([userdata, cardsdata]) => {
    document.querySelector('.profile__title').textContent = userdata.name;
    document.querySelector('.profile__description').textContent = userdata.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userdata.avatar})`;
    const myId = userdata._id;
    //console.log(myId);
    
    cardsdata.forEach((element)=>{
     // console.log(element);
      const cardElement = createCard(element, deleteCard, setLike, showImage, myId);
      cardsContainer.append(cardElement);
  });
});

// Редактирование профиля 

const editDataProfile =(data) => {
  return fetch(`${apiConfig.url}/users/me`,{
    method: 'PATCH',
    headers: {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
.then(handleResponse)
};

// Добавление новой карточки


const addNewCard = (data) =>{
  return fetch(`${apiConfig.url}/cards`,{
    method: 'POST',
    headers: {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        name: data.name ,
        link: data.link
   })
  }).then(handleResponse)
};

//удаление карточки

export const removeMyCard = (cardId) => {
  return fetch(`${apiConfig.url}/cards/${cardId}`,{
    method: 'DELETE',
    headers : {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
    }
  })
};


//постановка и снятие лайка 

export const pushLike = (cardId) => {
  return fetch(`${apiConfig.url}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers : {
      authorization : apiConfig.token,
      'Content-Type' : 'application/json'
    }
  }).then(handleResponse)
};

export const removeLike = (cardId) => {
  return fetch(`${apiConfig.url}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
    }
  }).then(handleResponse)
};


const changeAvatar = (data) =>{
  console.log(data);
  return fetch(`${apiConfig.url}/users/me/${data}`,{
    method: 'PATCH',
    headers: {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: data
    })
  }).then(handleResponse)
};
