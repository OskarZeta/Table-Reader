import searchData from '../utils/search_data.js';
import sortData from '../utils/sort_data.js';
import addNewEntry from '../utils/add_new_entry.js';
import validateFormField from '../utils/validate_form_field.js';

const data = [
  {
    id: 1,
    firstName: 'Andrey',
    lastName: 'Petrov',
    email: 'aaa@mail.ru',
    phone: '(123)456-7890'
  },
  {
    id: 2,
    firstName: 'Ivan',
    lastName: 'Abdreev',
    email: 'bbb@mail.ru',
    phone: '(987)654-3210'
  },
  {
    id: 3,
    firstName: 'Petr',
    lastName: 'Ivanov',
    email: 'ccc@mail.ru',
    phone: '(546)312-9807'
  },
];

describe('Testing utility functions', () => {
  it('Sorting data', () => {
    expect(sortData('id', 'asc', data)).toEqual(data);
    expect(sortData('id', 'desc', data)).toEqual(data.slice(0).reverse());
    expect(sortData('firstName', 'asc', data)).toEqual(data);
    expect(sortData('lastName', 'desc', data)).toEqual([ data[0], data[2], data[1] ]);
    expect(sortData('email', 'desc', data)).toEqual(data.slice(0).reverse());
    expect(sortData('phone', 'asc', data)).toEqual([ data[0], data[2], data[1] ]);
  });
  it('Searching data', () => {
    expect(searchData('iv', data)).toEqual([ data[1], data[2] ]);
    expect(searchData('1', data)).toEqual(data);
    expect(searchData('11', data)).toEqual([]);
  });
  it('Adding new entry', () => {
    let entry = {
      id: 4,
      firstName: 'Fedor',
      lastName: 'Sergeev',
      email: 'ddd@mail.ru',
      phone: '(678)234-7890'
    };
    expect(addNewEntry(entry, data)).toEqual([entry, ...data]);
  });
  it('Validate form field', () => {
    expect(validateFormField('id', '111')).toBeTruthy();
    expect(validateFormField('id', 'abc')).toBeFalsy();
    expect(validateFormField('firstName', 'albert')).toBeTruthy();
    expect(validateFormField('lastName', 'zotov12')).toBeFalsy();
    expect(validateFormField('email', 'somemail1234@m.ru')).toBeTruthy();
    expect(validateFormField('email', 'somemail1234.ru')).toBeFalsy();
    expect(validateFormField('phone', '(578)980-5555')).toBeTruthy();
    expect(validateFormField('phone', '8976-111-9880')).toBeFalsy();
  });
});
