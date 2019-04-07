import React from 'react';
import { shallow } from 'enzyme';
import AddForm from '../components/AddForm';

describe('AddForm component test', () => {
  it('AddForm component renders without crashing', () => {
    const component = shallow(<AddForm/>);
    expect(component.exists()).toBeTruthy();
  });
  it('Handles user information change', () => {
    const component = shallow(<AddForm/>);
    const instance = component.instance();
    const element = document.createElement('input');
    element.name = 'id';
    element.value = '11';
    const event = { target: element };
    instance.handleInfoChange(event);
    expect(component.state('info')).toEqual({
      id: 11,
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  });
  it('Sets an error code for corresponding user info field', () => {
    const component = shallow(<AddForm/>);
    const instance = component.instance();
    instance.setError('firstName', 1);
    expect(component.state('errorCodes')).toEqual({
      id: 2,
      firstName: 1,
      lastName: 2,
      email: 2,
      phone: 2
    });
  });
  it('Handles input field validation', () => {
    const component = shallow(<AddForm/>);
    const instance = component.instance();
    const element = document.createElement('input');
    element.name = 'id';
    element.value = '11';
    const event = { target: element };
    instance.handleFieldValidation(event);
    expect(component.state('errorCodes')).toEqual({
      id: 0,
      firstName: 2,
      lastName: 2,
      email: 2,
      phone: 2
    });
    element.value = 'abc';
    instance.handleFieldValidation(event);
    expect(component.state('errorCodes')).toEqual({
      id: 1,
      firstName: 2,
      lastName: 2,
      email: 2,
      phone: 2
    });
  });
});
