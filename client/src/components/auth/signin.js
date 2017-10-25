import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password }, () => {
      this.props.history.push('/feature');
    });
  }

  renderField(field) {
    //const { meta } = field // this is a destructure technique. meta === field.meta. helps us clean the line below
    const { meta: {touched, error} } = field // nested destructuring. field.meta === meta..also field.meta.touched === touched, and so on.
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          label="Email"
          component={this.renderField}
        />
        <Field
          name="password"
          label="Password"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(
  connect(null, { signinUser })(Signin)
);