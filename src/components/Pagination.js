import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';

class Pagination extends Component {
  state = {
    page: this.props.page,
    hasError: false
  }
  validatePage(value) {
    value = parseInt(value);
    if (Number.isNaN(value) || value <= 0) {
      return false;
    }
    return true;
  }
  handleUserNavigation(page) {
    if (this.validatePage(page)) {
      this.setState({
        hasError: false
      }, () => this.props.handlePageChange(parseInt(page)));
    } else {
      this.setState({
        page: this.props.page,
        hasError: true
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.setState({
        page: parseInt(this.props.page),
        hasError: false
      });
    }
  }
  render() {
    const { handlePageChange, page } = this.props;
    return(
      <>
        <div className="row col-12 col-sm-8 py-3 mx-auto d-flex justify-content-center">
          <button
            className="btn btn-outline-secondary col-3"
            onClick={() => handlePageChange(page - 1)} disabled={page === 1}
          >prev</button>
          <div className="col-6 d-flex justify-content-center">
            <input
              className="col-8 mr-1" value={this.state.page}
              onChange={e => this.setState({ page: e.target.value })}
            />
            <button
              className="btn btn-outline-secondary col-4"
              onClick={() => this.handleUserNavigation(this.state.page)}
            >go!</button>
          </div>
          <button
            className="btn btn-outline-secondary col-3"
            onClick={() => handlePageChange(page + 1)}
          >next</button>
        </div>
        {this.state.hasError &&
          <div className="d-flex justify-content-center">
            <ErrorMessage type="page"/>
          </div>
        }
      </>
    );
  }
}

export default Pagination;
