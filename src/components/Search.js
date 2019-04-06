import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    let input = this.textInput;
    return(
      <div className="row searchbar my-3">
        <div className="col-sm-7 col-md-8 mb-3 mb-sm-0">
          <input type="text" placeholder="search..." ref={input} className="form-control"/>
        </div>
        <div className="col-sm-5 col-md-4 d-flex justify-content-between justify-content-sm-start">
          <button className="mr-0 mr-sm-3 btn col-5 col-sm-auto btn-outline-primary" onClick={() =>
            this.props.handleSearchClick(input.current.value.trim())
          }>Найти</button>
          <button className="btn col-5 col-sm-auto btn-outline-secondary" onClick={() => {
            input.current.value = '';
            this.props.handleResetClick();
          }}>Сбросить</button>
        </div>
      </div>
    );
  }
}

export default Search;
