import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signupUser, authError } from '../../actions';

class Signup extends Component {
  componentWillMount() {
    // do not show signup form if already authenticated
    if (this.props.authenticated) {
      this.props.history.push('/feature')
      // Here I am using the history technique just to
      // illustrate another way of navigating.
      // I personally prefer the redirect technique as
      // used in signin.js
    }
  }

  componentWillUnmount() {
    // Clear any signup errors otherwise they will propagate to
    // the other redux-form components
    if (this.props.errorMessage) {
      this.props.authError(null)
    }
  }

  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password }, () => {
      this.props.history.push('/feature');
    });
  }

  displayField(field) {
    //const { meta } = field // this is a destructure technique. meta === field.meta. helps us clean the line below
    const { label, type, meta: {touched, error} } = field // nested destructuring. field.meta === meta..also field.meta.touched === touched, and so on.
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  displayAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          label="Email"
          component={this.displayField}
          type="text"
        />
        <Field
          name="password"
          label="Password"
          component={this.displayField}
          type="password"
        />
        <Field
          name="passwordConfirm"
          label="Confirm Password"
          component={this.displayField}
          type="password"
        />
        {this.displayAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  // Validate the inputs from 'values'
  if (!values.email || !validateEmail(values.email)) {
    errors.email = "Enter a valid email!";
  }
  if (!values.password) {
    errors.password = "Password cannot be blank!";
  }
  if (values.password && values.password.length < 4) {
    errors.password = "Password cannot be smaller than 4 characters!";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Password cannot be blank!";
  }
  if (values.password != values.passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match!";
  }
  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux-form assumes form is invalid
  return errors;
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated    
  }
}

Signup = connect(mapStateToProps, { signupUser, authError })(Signup)

export default reduxForm({
  validate, // shortened from 'validate: validate'
  form: 'signup'
})(Signup);