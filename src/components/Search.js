import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    let input = this.textInput;
    return(
      <div>
        <input type="text" placeholder="search..." ref={input} />
        <button onClick={() => this.props.handleSearchClick(input.current.value.trim())}>search</button>
        <button onClick={() => {
          input.current.value = '';
          this.props.handleResetClick();
        }}>reset</button>
      </div>
    );
  }
}

export default Search;
