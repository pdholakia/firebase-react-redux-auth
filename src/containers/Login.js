import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Button } from 'react-bootstrap';

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

  return errors;
};

class Login extends React.Component {
  handleFormSubmit = (values) => {
    this.props.signInUser(values);
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

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
    }
    return <div></div>;
  }  

  render() {
    return(
      <div className="container box">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>

          { this.renderAuthenticationError() }

  
        <div className="row socialButtons">
            <Button bsStyle="primary" className="col-xs-3 col-xs-offset-1 loginFB">Facebook</Button>
            <Button bsStyle="primary" className="col-xs-3 col-xs-offset-1 loginGO">Google</Button>
            <Button bsStyle="primary" className="col-xs-3 col-xs-offset-1 loginTW">Twitter</Button>
        </div>

        <div className="row omb_row-sm-offset-3 omb_loginOr">
            <div className="col-xs-12 col-sm-6">
                <hr className="omb_hrOr" />
                <span className="omb_spanOr"><strong><em>or</em></strong></span>
            </div>
        </div>

        <div className="row">
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)} className="col-xs-offset-1">
            <Field name="email" component={this.renderField} className="form-control" type="text" label="Email"/>
            <Field name="password" component={this.renderField} className="form-control" type="password" label="Password"/>
            
            <button action="submit" className="btn btn-primary pull-left">Login</button>
            <button action="submit" className="btn btn-link pull-right">Forgot Password</button>

          </form>
        </div>
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
  form: 'login',
  validate
})(Login));