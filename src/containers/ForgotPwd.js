/* Design based on http://bootsnipp.com/snippets/GzrWo */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Button, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors;
};

class ForgotPwd extends React.Component {
  handleFormSubmit = (values) => {
    console.log('fired');
    this.props.sendPwdResetMail(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  renderPasswordResetMessage() {
    if (this.props.passwordResetError === "Password reset link is sent to the given email address.") {
      return <div className="alert alert-success">{ this.props.passwordResetError }</div>
    } else if (this.props.passwordResetError !== null) {
      return <div className="alert alert-warning">{ this.props.passwordResetError }</div>;
    }
    return <div></div>;
  }  

  render() {
    return (
      
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <Panel>
            <div className="col-md-10 col-md-offset-1">
              <h4 className="text-center">Reset password</h4>
              
          

                <div className="row">
                { this.renderPasswordResetMessage() }

                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                  <p>Enter the email address associated with your account, and we will email you a link to reset your password.</p>  
                  <Field name="email" type="text" component={this.renderField} label="Email" />

                  <Button action="submit" bsStyle="primary" className="col-md-12">Reset Password</Button>
                </form>
                  
                </div>
            </div>
            </Panel>
        </div>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    passwordResetError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'forgotpwd',
  validate
})(ForgotPwd));