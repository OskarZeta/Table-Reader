import React, { Component } from 'react';
import validateFormField from '../utils/validate_form_field';
import ErrorMessage from './ErrorMessage';

const defaultErrorCodes = {};
defaultErrorCodes.id =
defaultErrorCodes.firstName =
defaultErrorCodes.lastName =
defaultErrorCodes.email =
defaultErrorCodes.phone = 2;

const defaultState = {
  info: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  },
  errorCodes: defaultErrorCodes,
  valid: false
}

class AddForm extends Component {
  state = defaultState
  handleInfoChange(e) {
    if (e.target.tagName === 'INPUT') {
      let obj = {};
      let value = e.target.value;
      if (e.target.name === 'id') value = parseInt(e.target.value);
      obj[e.target.name] = value;
      this.setState({
        info: Object.assign({}, this.state.info, obj)
      });
    }
  }
  setError(type, value) {
    let error = {};
    error[type] = value;
    this.setState({
      errorCodes: Object.assign({}, this.state.errorCodes, error)
    });
  }
  handleFieldValidation(e) {
    let type = e.target.name;
    let value = e.target.value;
    validateFormField(type, value) ? this.setError(type, 0) : this.setError(type, 1);
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      errorCodes: defaultErrorCodes,
      valid: false
    });
    const undefinedInfo = {};
    undefinedInfo.streetAddress = undefinedInfo.city = undefinedInfo.state = undefinedInfo.zip = undefined;
    this.props.handleAddEntry(Object.assign({}, this.state.info, {
      address: undefinedInfo
    }));
    e.target.reset();
  }
  componentDidUpdate(_, prevState) {
    if (prevState.errorCodes !== this.state.errorCodes) {
      if (Object.values(this.state.errorCodes).every(errorCode => errorCode === 0)) {
        this.setState({ valid: true });
      } else if (this.state.valid) this.setState({ valid: false });
    }
  }
  render() {
    const { id, firstName, lastName, email, phone } = this.state.errorCodes;
    return(
      <form className="mt-4" onSubmit={(e) => this.handleFormSubmit(e)}>
        <div className="container-fluid" onChange={e => this.handleInfoChange(e)}>
          <div className="form-group">
            <label className="row">
              <span className="col-sm-3 col-form-label">id</span>
              <div className="col-sm-9">
                <input
                  type="text" name="id" onBlur={e => this.handleFieldValidation(e)}
                  placeholder="введите id" className="form-control"
                />
                {id === 1 && <ErrorMessage type="id"/>}
              </div>
            </label>
          </div>
          <div className="form-group">
            <label className="row">
              <span className="col-sm-3 col-form-label">first name</span>
              <div className="col-sm-9">
                <input
                  type="text" name="firstName" onBlur={e => this.handleFieldValidation(e)}
                  placeholder="введите имя" className="form-control"
                />
                {firstName === 1 && <ErrorMessage type="name"/>}
              </div>
            </label>
          </div>
          <div className="form-group">
            <label className="row">
              <span className="col-sm-3 col-form-label">last name</span>
              <div className="col-sm-9">
                <input
                  type="text" name="lastName" onBlur={e => this.handleFieldValidation(e)}
                  placeholder="введите фамилию" className="form-control"
                />
                {lastName === 1 && <ErrorMessage type="name"/>}
              </div>
            </label>
          </div>
          <div className="form-group">
            <label className="row">
              <span className="col-sm-3 col-form-label">email</span>
              <div className="col-sm-9">
                <input
                  type="text" name="email" onBlur={e => this.handleFieldValidation(e)}
                  placeholder="введите e-mail" className="form-control"
                />
                {email === 1 && <ErrorMessage type="email"/>}
              </div>
            </label>
          </div>
          <div className="form-group">
            <label className="row">
              <span className="col-sm-3 col-form-label">phone</span>
              <div className="col-sm-9">
                <input
                  type="text" name="phone" onBlur={e => this.handleFieldValidation(e)}
                  placeholder="введите телефон" className="form-control"
                />
                {phone === 1 && <ErrorMessage type="phone"/>}
              </div>
            </label>
          </div>
        </div>
        <button className="btn btn-outline-success" type="submit" disabled={!this.state.valid}>Добавить запись</button>
      </form>
    );
  }
}

export default AddForm;
