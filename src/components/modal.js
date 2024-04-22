function openModal(item){
    item.classList.add('popup_is-opened');
    item.classList.add('popup_is-animated');
    item.addEventListener('click', overlayClose);
    document.addEventListener('keydown', escClose);
};

function closeModal(item){  
    item.classList.remove('popup_is-opened');
    item.removeEventListener('click', overlayClose);
    document.removeEventListener('keydown',escClose);
    };

function overlayClose(evt){
    if (evt.target === evt.currentTarget) {
    closeModal(document.querySelector('.popup_is-opened'));
   }
};

function escClose(evt){ 
        if(evt.key === 'Escape' || evt.key === '27'){
        closeModal(document.querySelector('.popup_is-opened'));
        }
};



export {openModal, closeModal};