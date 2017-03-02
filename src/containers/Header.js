import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import * as Actions from '../actions';

class Header extends React.Component {

    renderAuthLinks() {
        if (this.props.authenticated) {
            return [
                <NavItem eventKey={1}><Button bsStyle="link" data-toggle="modal" data-target="#at-login">Sign In</Button></NavItem>,
                <NavItem eventKey={2}><Button bsStyle="link" data-toggle="modal" data-target="#at-login">Sign Up</Button></NavItem>
            ]
        } else {
            return [
                <NavItem eventKey={1}><Button bsStyle="link" onClick={() => browserHistory.push('/login')}>Login</Button></NavItem>,                
                <NavItem eventKey={1}><Button bsStyle="link" onClick={() => browserHistory.push('/signup')}>Sign Up</Button></NavItem>           
            ]
        }
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link href="#">Firebase React-Redux Auth</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                                { this.renderAuthLinks() }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );  
    }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);