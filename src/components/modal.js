function openModal(item){
    item.classList.add('popup_is-opened');
    document.addEventListener('click', () => {
        overlayClose(item);
    });

    document.addEventListener('keydown', () => {
        escClose(item);
    });
};



function closeModal(item){  
    item.classList.remove('popup_is-opened');
        document.removeEventListener('click', () => overlayClose(item));
        document.removeEventListener('keydown',() => escClose(item));
    };



function overlayClose(evt){
    if (evt.target === evt.currentTarget) {
    closeModal();
   }
};

function escClose(evt){ 
        if(evt.key === 'escape' || evt.key === '27'){
            closeModal();
        }
};



export {openModal, closeModal};