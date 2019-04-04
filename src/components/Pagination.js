import React, { Component } from 'react';

class Pagination extends Component {
  state = {
    page: this.props.page
  }
  validatePage(value) {
    value = parseInt(value);
    if (Number.isNaN(value) || value <= 0) {
      return false;
    }
    return true;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.setState({
        page: parseInt(this.props.page)
      })
    }
  }
  render() {
    const { handlePageChange, page } = this.props;
    return(
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>prev</button>
        <div>
          <input value={this.state.page} onChange={e => {
            this.setState({ page: e.target.value });
          }}/>
          <button onClick={() => {
            if (this.validatePage(this.state.page)) {
              handlePageChange(parseInt(this.state.page));
            } else {
              console.log('wrong page');
            }
          }}>go!</button>
        </div>
        <button onClick={() => handlePageChange(page + 1)}>next</button>
      </div>
    );
  }
}

export default Pagination;
