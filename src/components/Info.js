import React from 'react';

const Info = ({ handleShowInfo, info }) =>
  <div>
    <h3>Info</h3>
    <div>Выбран пользователь <b>{info.firstName} {info.lastName}</b></div>
    <div>Описание:</div>
    <textarea value={info.description} readOnly/>
    <div>Адрес проживания: <b>{info.address.streetAddress}</b></div>
    <div>Город: <b>{info.address.city}</b></div>
    <div>Провинция/штат: <b>{info.address.state}</b></div>
    <div>Индекс: <b>{info.address.zip}</b></div>
    <button onClick={() => handleShowInfo()}>close</button>
  </div>

export default Info;
