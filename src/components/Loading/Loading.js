import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/svg/logo.svg';
import './Loading.css';

class Loading extends Component {
  static propTypes = {
    title: PropTypes.string,
    loadingText: PropTypes.string,
  }

  static defaultProps = {
    title: "Welcome!",
    loadingText: "Loading...",
  }

  render() {
    return (
      <div className="loading">
        <div className="loading-header">
          <h2>{this.props.title}</h2>
          <img src={logo} className="loading-logo" alt="logo"/>
        </div>
        <p className="loading-intro">
          {this.props.title}
        </p>
      </div>
    );
  }
}

export default Loading;
