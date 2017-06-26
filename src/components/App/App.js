import React, {Component} from 'react';

import {Dimmer, Loader, Menu} from 'semantic-ui-react'

import {translate} from 'utils/languages';

import firebase from 'firebase';

import './App.css';

class App extends Component {

  state = {
    loading: true,
    loadingText: "",
    user: null
  }

  componentDidMount() {
    if (firebase.auth().currentUser) {
      this.setState({user: firebase.auth().currentUser, loading: false});
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user, loading: false});
      } else {
        console.log('no user');
        // this.setState({user: null, loading: false})
      }
    });

    firebase.auth().getRedirectResult().then((result) => {
      if (result.user) {
        // The signed-in user info.
        this.setState({user: result.user, loading: false});
      }
    }).catch((error) => {
    });
  }

  handleGoogleLogin = (e) => {
    this.setState({loading: true});
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider);
  }

  handleFacebookLogin = (e) => {}

  handleLogout = (e) => {
    this.setState({loading: true})
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.setState({user: null, loading: false})
    }, (error) => {
      // An error happened.
    });
  }

  renderLoginButton() {
    const {t} = this.props;
    return (
      <div className="login-buttons">
        <button className="login-google" onClick={this.handleGoogleLogin}>{t('app.googleLogin')}</button>
        <button className="login-facebook">{t('app.facebookLogin')}</button>
      </div>
    );
  }

  renderChannelsList() {
    const {t} = this.props;
    return (
      <div style={{
        height: "100%"
      }} className="app">
        <Menu className="app-menu" vertical>
          <Menu.Item>
            <Menu.Header>{t('app.menuTitle')}</Menu.Header>
            <Menu.Menu>
              <Menu.Item onClick={this.handleLogout}>
                {t('app.logout')}
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
        <div className="app-content">
          {this.state.user.displayName}
        </div>
      </div>
    );
  }

  renderContent() {
    if (this.state.user) {
      return this.renderChannelsList();
    } else {
      return this.renderLoginButton();
    }
  }

  render() {
    return (
      <div style={{
        height: "100%"
      }}>
        <Dimmer active={this.state.loading}>
          <Loader indeterminate>{this.state.loadingText}</Loader>
        </Dimmer>
        {this.renderContent()}
      </div>
    );
  }
}

export default translate()(App);
