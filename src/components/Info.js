import React from 'react';

const Info = ({ handleShowInfo, info }) => {
  const { firstName, lastName, description } = info;
  const { streetAddress, city, state, zip } = info.address;
  return(
    <div>
      <h3>Info</h3>
      <div>Выбран пользователь <b>{firstName} {lastName}</b></div>
      <div>Описание:</div>
      <textarea value={description ? description : 'Недоступно'} readOnly/>
      <div>Адрес проживания: <b>{streetAddress ? streetAddress : 'Недоступен'}</b></div>
      <div>Город: <b>{city ? city : 'Недоступен'}</b></div>
      <div>Провинция/штат: <b>{state ? state : 'Недоступен'}</b></div>
      <div>Индекс: <b>{zip ? zip : 'Недоступен'}</b></div>
      <button onClick={() => handleShowInfo()}>close</button>
    </div>
  );
}

export default Info;
