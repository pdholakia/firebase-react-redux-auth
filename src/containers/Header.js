import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import * as Actions from '../actions';

class Header extends React.Component {
 
     handleSignout = () => {
        this.props.signOutUser();
    }

    renderAuthLinks() {
        if (this.props.authenticated) {
            return <NavItem eventKey={1}><Button bsStyle="link" onClick={() => this.handleSignout()}>Logout</Button></NavItem>    
            {/*[
                <NavItem eventKey={1}><Button bsStyle="link" onClick={() => browserHistory.push('/profile')}>Profile</Button></NavItem> ,              
                <NavItem eventKey={1}><Button bsStyle="link" onClick={() => this.handleSignout()}>Logout</Button></NavItem>           
            ] */}
        } else {
            return [
                <NavItem eventKey={1}><Button bsStyle="link" onClick={() => browserHistory.push('/login')}>Login</Button></NavItem>,                
                <NavItem eventKey={2}><Button bsStyle="link" onClick={() => browserHistory.push('/signup')}>Sign Up</Button></NavItem>           
            ]
        }
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Firebase React-Redux Auth</Link>
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

export default connect(mapStateToProps, Actions)(Header);