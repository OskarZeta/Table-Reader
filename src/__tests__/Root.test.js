import React from 'react';
import { shallow } from 'enzyme';
import Root from '../components/Root';

describe('Root component test', () => {
  it('Root component renders without crashing', () => {
    const root = shallow(<Root/>);
    expect(root.exists()).toBeTruthy();
  });
  it('Sends user to the main page, resets data', () => {
    const root = shallow(<Root/>);
    const instance = root.instance();
    instance.goBack();
    expect(root.state('data')).toEqual(undefined);
    expect(root.state('loading')).toBeFalsy();
  });
  it('Fetch data from server', () => {
    const root = shallow(<Root/>);
    const instance = root.instance();
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return 'test data';
          }
        });
      });
    });
    const url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    const request = new Request(url);
    instance.fetchData('small');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(request);
    process.nextTick(() => {
      expect(root.state()).toEqual({
        data: 'test data',
        loading: false,
        hasError: false
      });
      global.fetch.mockClear();
    });
  });
});
