/* Design based on http://bootsnipp.com/snippets/GzrWo */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
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

class ResetPassword extends React.Component {
  handleFormSubmit = (values) => {
    this.props.confirmPasswordReset(this.props.location.query.oobCode, values);
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
    if (this.props.passwordResetMsg === "Password reset successfully.") {
      return (
          <div>
            <div className="alert alert-success">{ this.props.passwordResetMsg }</div>
            <Button type="button" bsStyle="primary" className="col-md-12" onClick={() => browserHistory.push('/login')}>Login Now</Button>
          </div>
      )
    } else if (this.props.passwordResetMsg !== null) {
      return (
        <div>
          <div className="alert alert-warning">{ this.props.passwordResetMsg }</div>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="password" type="password" component={this.renderField} label="Password" />
            <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />

            <Button type="submit" bsStyle="primary" className="col-md-12">Reset Password</Button>
          </form>      
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Field name="password" type="password" component={this.renderField} label="Password" />
          <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />

          <Button type="submit" bsStyle="primary" className="col-md-12">Reset Password</Button>
        </form>    
      </div>);
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
    passwordResetMsg: state.auth.resetMsg
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'resetpassword',
  validate
})(ResetPassword));