import {openModal} from "./modal";
import {cardTemplate, cardsContainer, popupImage} from "../index.js";


function createCard(card, deleteCard, setLike, showImage){
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardItem.querySelector('.card__title').textContent = card.name;
    const deleteCardButton = cardItem.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function(){
        deleteCard(cardItem)});
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', function(){
        setLike(cardLikeButton)});
    cardImage.addEventListener('click', function(){
        showImage(card)});

    return cardItem;
  };
  
  function deleteCard(cardItem){
    return cardItem.remove();
  };
  
  function setLike(item){
    item.classList.toggle('card__like-button_is-active');
  };
  
  function showImage(card){
    document.querySelector('.popup__image').src = card.link;
    document.querySelector('.popup__image').alt = card.name;
    document.querySelector('.popup__caption').textContent = card.name;
    openModal(popupImage);
  }
  

  export {createCard, deleteCard, setLike, showImage};