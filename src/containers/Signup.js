/* Design based on http://bootsnipp.com/snippets/GzrWo */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Button, Panel, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router';
import '../styles/social.css';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation ) {
    errors.password = 'Passwords do not match';
  }

  return errors;
};

class Signup extends React.Component {
  handleFormSubmit = (values) => {
    this.props.signUpUser("email", values);
  };

  handleSocialLogin = (providerName) => {
    this.props.signUpUser(providerName, "");
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-warning">{ this.props.authenticationError }</div>;
    }
    return <div></div>;
  }  

  render() {
    return (
      
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <Panel>
            <div className="col-md-10 col-md-offset-1">
              <h4 className="text-center">Sign up with</h4>
          
          

            <div className="row">
                { this.renderAuthenticationError() }
                <div className="row">
                  <ButtonToolbar>              
                    <div className="col-md-4">
                        <Button bsClass="btn btn-block btn-social btn-facebook"
                                onClick={()=>this.handleSocialLogin("facebook")}>
                            <span className="fa fa-facebook"></span>Facebook
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <Button bsClass="btn btn-block btn-social btn-google"
                                onClick={()=>this.handleSocialLogin("google")}>
                            <span className="fa fa-google"></span>Google
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <Button bsClass="btn btn-block btn-social btn-twitter"
                                onClick={()=>this.handleSocialLogin("twitter")}>
                            <span className="fa fa-twitter"></span>Twitter
                        </Button>
                    </div>                                        
                  </ButtonToolbar>                              
                </div>
            </div>

            <div className="row">

                <div className="signup-or-separator">
                    <span className="h6 signup-or-separator-text">or with email</span>
                    <hr />
                </div>

                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                  <Field name="email" type="text" component={this.renderField} label="Email" />
                  <Field name="password" type="password" component={this.renderField} label="Password" />
                  <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />

                    <Button type="submit" bsStyle="primary" className="col-md-12">Sign Up</Button>
										<p>By signing up, I agree to <a href="#">Terms of Service</a>, and  <a href="#">Privacy Policy</a>. </p>

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
    authenticationError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'signup',
  validate
})(Signup));