import './scripts/index.js';
import './pages/index.css';
import { closeModal, openModal} from './components/modal.js';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.profile__image');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupCloseButton = document.querySelectorAll('.popup__close');
const modal = document.querySelectorAll ('.popup');
editButton.addEventListener('click',() => openModal(popupEdit));
addButton.addEventListener('click',() => openModal(popupAdd));
imageButton.addEventListener('click',() => openModal(popupImage));
popupCloseButton.forEach(
    (item) => {
            const popup = item.closest('.popup');
            item.addEventListener('click',()=> closeModal(popup) )
        });


