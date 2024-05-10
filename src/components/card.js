import {cardTemplate, cardsContainer, popupImage, showImage, removeMyCard, pushLike, removeLike, cardLikeCheck} from "../index.js";

function createCard(card, deleteCard, setLike, showImage, myId){
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    const cardLikeScore = cardItem.querySelector('.card__like-button-score');
    cardLikeScore.textContent = card.likes.length;
    cardItem.querySelector('.card__title').textContent = card.name;
    const deleteCardButton = cardItem.querySelector('.card__delete-button');
    const cardOwnerId = card.owner._id;
    const cardId = card._id;

    if(cardOwnerId === myId ){
      deleteCardButton.style.display = 'block';
    } else {
      deleteCardButton.style.display = 'none';
    };

    deleteCardButton.addEventListener('click', function(){
        removeMyCard(cardId)
        .then((response)=>{
          if(response.ok){
          deleteCard(cardItem);
          }})
      });
    const cardLikeButton = cardItem.querySelector('.card__like-button');

    if(card.likes.some(like => like._id === myId)){
      cardLikeButton.classList.add('card__like-button_is-active');
    }
    
    cardLikeButton.addEventListener('click', function(){
      if(!cardItem.querySelector('.card__like-button_is-active')){
        pushLike(cardId)
        .then((response)=>{
          cardLikeScore.textContent = response.likes.length;
          setLike(cardLikeButton);
        })} else {
          removeLike(cardId)
          .then((response)=>{
            cardLikeScore.textContent = response.likes.length;
          setLike(cardLikeButton);
          })
        }
       //setLike(cardLikeButton);
    });
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
  

  export {createCard, deleteCard, setLike};