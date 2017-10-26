import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signinUser, authError } from '../../actions';
import { Redirect } from 'react-router-dom';

class Signin extends Component {
  componentWillMount() {
    // Clear any signup errors otherwise they will propagate to
    // the other redux-form components
    // I prefer to clear this at component startup since it
    // smooths out smoe edge cases. But can also be placed
    // when component unmounts as per signup.js
    if (this.props.errorMessage) {
      this.props.authError(null)
    }
  }

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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
          <strong>Error!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  getRedirectPath() {
    const locationState = this.props.location.state
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname // redirects to referring url
    } else {
      return '/'
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      (this.props.authenticated) ?
        // Authenticated, let user pass!
        <Redirect to={{
          pathname: this.getRedirectPath(), state: {
            from: this.props.location
          }
        }}/>
        :
        // Not authenticated, redirect to signin page!
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
          {this.displayAlert()}
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  }
}

Signin = connect(mapStateToProps, { signinUser, authError })(Signin)

export default reduxForm({
  form: 'signin'
})(Signin);