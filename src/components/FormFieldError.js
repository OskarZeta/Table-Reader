import React from 'react';

const errorMessages = {
  id: 'Wrong id detected. It should only consist of numbers.',
  name: 'Wrong name detected. It should only consist of latin letters.',
  email: 'Wrong email format detected. Valid example - example-mail@mail.ru',
  phone: 'Wrong phone format detected. It should match this pattern - (123)456-7890.'
}

const FormFieldError = ({ type }) =>
  <div>
    {errorMessages[type]}
  </div>

export default FormFieldError;
