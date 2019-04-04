import React, { Component } from 'react';
import validateFormField from '../utils/validate_form_field';
import FormFieldError from './FormFieldError';

const defaultState = {
  info: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  },
  errorCodes: {
    id: 2,
    firstName: 2,
    lastName: 2,
    email: 2,
    phone: 2
  },
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
      errorCodes: {
        id: 2,
        firstName: 2,
        lastName: 2,
        email: 2,
        phone: 2
      },
      valid: false
    });
    this.props.handleAddEntry(Object.assign({}, this.state.info, {
      address: {
        streetAddress: undefined,
        city: undefined,
        state: undefined,
        zip: undefined
      }
    }));
    e.target.reset();
  }
  componentDidUpdate(_, prevState) {
    if (prevState.errorCodes !== this.state.errorCodes) {
      if (Object.values(this.state.errorCodes).every(errorCode => errorCode === 0)) {
        this.setState({ valid: true });
      }
    }
  }
  render() {
    const { id, firstName, lastName, email, phone } = this.state.errorCodes;
    return(
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
            </tr>
            <tr onChange={e => this.handleInfoChange(e)}>
              <td>
                <input type="text" name="id" onBlur={e => this.handleFieldValidation(e)}/>
                {id === 1 && <FormFieldError type="id"/>}
              </td>
              <td>
                <input type="text" name="firstName" onBlur={e => this.handleFieldValidation(e)}/>
                {firstName === 1 && <FormFieldError type="name"/>}
              </td>
              <td>
                <input type="text" name="lastName" onBlur={e => this.handleFieldValidation(e)}/>
                {lastName === 1 && <FormFieldError type="name"/>}
              </td>
              <td>
                <input type="text" name="email" onBlur={e => this.handleFieldValidation(e)}/>
                {email === 1 && <FormFieldError type="email"/>}
              </td>
              <td>
                <input type="text" name="phone" onBlur={e => this.handleFieldValidation(e)}/>
                {phone === 1 && <FormFieldError type="phone"/>}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" disabled={!this.state.valid}>send</button>
      </form>
    );
  }
}

export default AddForm;
