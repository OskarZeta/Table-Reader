import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../components/Pagination';

describe('Pagination component test', () => {
  it('Pagination component renders without crashing', () => {
    const component = shallow(<Pagination/>);
    expect(component.exists()).toBeTruthy();
  });
  it('Validates page number', () => {
    const component = shallow(<Pagination/>);
    const instance = component.instance();
    expect(instance.validatePage('111')).toBeTruthy();
    expect(instance.validatePage('abv')).toBeFalsy();
  });
  it('Handles user navigation', () => {
    const component = shallow(<Pagination handlePageChange={function(){}}/>);
    const instance = component.instance();
    instance.handleUserNavigation('111');
    expect(component.state('hasError')).toBeFalsy();
    instance.handleUserNavigation('abc');
    expect(component.state('hasError')).toBeTruthy();
  });
});
