import React, { Component } from 'react';
import App from './App';
//import sortData from '../utils/sort_data';

class Root extends Component {
  state = {
    data: undefined,
    loading: false
  }
  fetchData(size) {
    let url;
    if (size === 'small') {
      url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    } else if (size === 'big') {
      url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    } else throw new Error('wrong data size!');
    let req = new Request(url);
    this.setState({
      loading: true
    }, () => {
      fetch(req)
        .then(res => {
          if (!res.ok) throw new Error('server error, status =', res.status);
          return res.json();
        })
        .then(data => {
          //console.log(data);
          this.setState({
            //data: sortData('id', 'asc', data),
            data,
            loading: false
          });
        });
    });
  }
  render() {
    return (
      <div>
        {!this.state.data && !this.state.loading && <div>
          <header>Table reader</header>
          <div>Choose your chair:
            <button onClick={() => this.fetchData('small')}>
              small data
            </button>
            <button onClick={() => this.fetchData('big')}>
              big data
            </button>
          </div>
        </div>}
        {this.state.loading && <div>Loading data...</div>}
        {this.state.data && !this.state.loading && <App defaultData={this.state.data}/>}
      </div>
    );
  }
}

export default Root;
