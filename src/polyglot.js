import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';

// Provider root component
class I18n extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: props.locale,
      messages: props.messages
    }
    this._polyglot = new Polyglot({locale: this.state.locale, phrases: this.state.phrases});
  }

  changeLocale = (newLocale) => {

  }

  changeMessages = (newMessages) => {

  }

  getChildContext() {
    return {
      t: this._polyglot.t.bind(this._polyglot)
    };
  }

  componentWillUpdate(newProps, newState) {
    if (newState.locale !== this.state.locale) {
      this._polyglot = new Polyglot({locale: newState.locale, phrases: newState.messages})
    }
  }

  render() {
    const children = this.props.children;
    return React.Children.only(children);
  }
}

I18n.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

I18n.childContextTypes = {
  t: PropTypes.func.isRequired
};

// higher order decorator for components that need `t`
function translate() {
  return (WrappedComponent) => {
    const _translate = (props, context) => (<WrappedComponent {...props} t={context.t} changeLocale={context.changeLocale}/>);

    _translate.contextTypes = {
      t: PropTypes.func.isRequired
    };

    return _translate;
  };
}

export {translate, I18n}
