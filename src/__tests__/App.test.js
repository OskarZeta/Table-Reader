import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

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

describe('App component test', () => {
  it('App component renders without crashing', () => {
    const app = shallow(<App/>);
    expect(app.exists()).toBeTruthy();
  });
  it('Handles search click', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    instance.setState({ data, defaultData: data });
    instance.handleSearchClick('cc');
    expect(app.state('data')).toEqual([ data[2] ]);
  });
  it('Reset button', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    instance.handleResetClick();
    expect(app.state('data')).toEqual([]);
    expect(app.state('sort')).toEqual({ by: undefined, dir: undefined });
    expect(app.state('page')).toEqual(1);
    expect(app.state('info')).toEqual(undefined);
  });
  it('Handles sort click', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    const element = document.createElement('span');
    element.classList.add('sort');
    element.dataset.type = 'id';
    const event = { target: element };
    instance.setState({ data });
    instance.handleSortClick(event);
    expect(app.state('data')).toEqual(data);
    expect(app.state('sort')).toEqual({ by: 'id', dir: 'asc' });
    element.dataset.type = 'firstName';
    instance.handleSortClick(event);
    expect(app.state('data')).toEqual(data.slice(0).reverse());
    expect(app.state('sort')).toEqual({ by: 'firstName', dir: 'desc' });
  });
  it('Handles page change', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    instance.handlePageChange(2);
    expect(app.state('page')).toEqual(2);
    expect(app.state('info')).toEqual(undefined);
  });
  it('Handles individual user info', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    instance.handleShowInfo({ id: '1', firstName: 'Ivan', lastName: 'Ivanov' });
    expect(app.state('info')).toEqual({
      id: '1',
      firstName: 'Ivan',
      lastName: 'Ivanov'
    });
  });
  it('Handles adding new users', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    instance.setState({ data, defaultData: data });
    const entry = {
      id: '4',
      firstName: 'Sergey',
      lastName: 'Petrov',
      email: 'ddd@mail.ru',
      phone: '(111)111-1111'
    };
    instance.handleAddEntry(entry);
    expect(app.state('data')).toEqual([entry, ...data]);
  });
  it('Toggles form for adding new users', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    instance.toggleAddForm();
    expect(app.state('toggleForm')).toBeTruthy();
    instance.toggleAddForm();
    expect(app.state('toggleForm')).toBeFalsy();
  });
  it('Slices data for table component', () => {
    const app = shallow(<App/>);
    const instance = app.instance();
    let array = new Array(50);
    array = array.fill({}, 0, 50);
    instance.setState({ data: array });
    let dataToShow = instance.sliceData();
    expect(dataToShow.length).toEqual(50);
    array = new Array(80);
    instance.setState({ data: array });
    instance.handlePageChange(2);
    dataToShow = instance.sliceData();
    expect(dataToShow.length).toEqual(30);
  });
});
