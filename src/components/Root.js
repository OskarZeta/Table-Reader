import React, { Component } from 'react';
import App from './App';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

class Root extends Component {
  state = {
    data: undefined,
    loading: false,
    hasError: false
  }
  goBack = () => {
    this.setState({
      data: undefined,
      loading: false
    });
  }
  fetchData(size) {
    let url;
    if (size === 'small') {
      url = 'https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    } else if (size === 'big') {
      url = 'https://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    } else throw new Error('wrong data size!');
    let req = new Request(url);
    this.setState({
      loading: true,
      hasError: false
    }, () => {
      fetch(req)
        .then(res => {
          if (!res.ok) throw new Error('server error, status =', res.status);
          return res.json();
        })
        .then(data => this.setState({ data, loading: false }))
        .catch(e => {
          console.log(e.message);
          this.setState({ loading: false, hasError: true });
        });
    });
  }
  render() {
    return (
      <>
        <header className="header">
          <div className="container">
            <h1 className="col-12 p-4 text-uppercase">Table reader</h1>
          </div>
        </header>
        <div className="container">
          {!this.state.data && !this.state.loading &&
            <div>
              <div>
                <div className="my-3">Выберите набор данных:</div>
                <div>
                  <div>
                    <button className="btn btn-info p-3 mb-3 w-50" onClick={() => this.fetchData('small')}>
                      небольшой (32 записи)
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-info p-3 w-50" onClick={() => this.fetchData('big')}>
                      большой (1000 записей)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          {this.state.loading && <div><Spinner /></div>}
          {this.state.hasError && <div className="mt-3"><ErrorMessage type="fetch"/></div>}
          {this.state.data && !this.state.loading && !this.state.hasError &&
            <App defaultData={this.state.data} goBack={this.goBack} />
          }
        </div>
      </>
    );
  }
}

export default Root;
