const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(card, deleteCard){
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__image').src = card.link;
    cardItem.querySelector('.card__image').alt = card.name;
    cardItem.querySelector('.card__title').textContent = card.name;
    const deleteCardButton = cardItem.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function(){
        deleteCard(cardItem)});
    return cardItem;
}

function deleteCard(cardItem){
    return cardItem.remove();
}

initialCards.forEach(function(card){
    const cardElement = createCard(card, deleteCard);
    cardsContainer.append(cardElement);
});