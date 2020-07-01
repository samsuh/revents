import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/Register/authActions";

const actions = {
  openModal,
  logout,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

class NavBar extends Component {
  //temporary until auth is done
  // state = {
  //   authenticated: false,
  // };

  // handleSignIn = () => this.setState({ authenticated: true });
  handleSignIn = () => this.props.openModal("LoginModal");
  handleRegister = () => this.props.openModal("RegisterModal");

  handleSignOut = () => {
    // this.setState({ authenticated: false });
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    // const { authenticated } = this.state;
    const { auth } = this.props;
    const authenticated = auth.authenticated;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} exact to="/events" name="Events" />
          {/* dont display if not logged in */}
          {authenticated && (
            <>
              <Menu.Item as={NavLink} to="/people" name="People" />
              <Menu.Item as={NavLink} to="/test" name="TestArea" />
              <Menu.Item as={Link} to="/createEvent">
                <Button
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                />
              </Menu.Item>
            </>
          )}
          {authenticated ? (
            <SignedInMenu
              signOut={this.handleSignOut}
              currentUser={auth.currentUser}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(NavBar));
