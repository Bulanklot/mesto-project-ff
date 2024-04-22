import './scripts/cards.js';
import './pages/index.css';
import './components/card.js';
import {initialCards} from './scripts/cards.js';
import {closeModal, openModal} from './components/modal.js';
import {createCard, deleteCard, setLike} from './components/card.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close');
export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
export const popupImage = document.querySelector('.popup_type_image');

initialCards.forEach(function(card){
    const cardElement = createCard(card, deleteCard, setLike, showImage);
    cardsContainer.append(cardElement);
  });

editButton.addEventListener('click',function() {
    const editForm = document.forms.editprofile;
    editForm.elements.name.value = document.querySelector('.profile__title').textContent;
    editForm.elements.description.value = document.querySelector('.profile__description').textContent;
    openModal(popupEdit)});
addButton.addEventListener('click',() => openModal(popupAdd));

popupCloseButtons.forEach(
    (item) => {
            const popup = item.closest('.popup');
            item.addEventListener('click',()=> closeModal(popup));
        });


// Находим форму в DOM
const formElementEdit = document.querySelector('.popup__form-edit');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    nameInput.value;
    jobInput.value;// Получите значение полей jobInput и nameInput из свойства value

    const title = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description');// Выберите элементы, куда должны быть вставлены значения полей

    title.textContent = nameInput.value;
    description.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
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
    const cardElement = createCard(card, deleteCard, setLike, showImage);
    cardsContainer.prepend(cardElement);
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




