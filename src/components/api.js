// API
export const apiConfig = {
    url : 'https://mesto.nomoreparties.co/v1/wff-cohort-12' ,
    token: '2e3048b1-c103-405c-8f6d-2f119dda7be2'
  };
  
  
export  const handleResponse = (response) =>{
    if(response.ok){
      return response.json();
    }else{
    return Promise.reject(`Ошибка: ${response.status}`);
     }
   };

// выводим ошибку в консоль

export const errorCheck = (err) => {
    console.log(err); 
  }; 

    // Загрузка информации о пользователе с сервера

export  const getUserInfo = ()=> {
    return fetch(`${apiConfig.url}/users/me`, 
  { method: 'GET',
    headers: {authorization : apiConfig.token}
  })
  .then(handleResponse);
  };
  
  // Загрузка карточек с сервера
  
export  const getInitialCards = () =>{
  return fetch(`${apiConfig.url}/cards`, {
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(handleResponse)
  };
  
  // Редактирование профиля 

export const editDataProfile =(data) => {
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


export const addNewCard = (data) =>{
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
    }).then(handleResponse)
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
  
  // смена аватара

export const changeAvatar = (data) =>{
    return fetch(`${apiConfig.url}/users/me/avatar`,{
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
  