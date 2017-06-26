import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';

const InitialMessagesNeeded = (message = "Initial messages file is needed.") => {
  this.message = message;
  this.name = 'InitialMessagesNeeded';
}

const NoLanguageFound = (message = "No language found on messages file.") => {
  this.message = message;
  this.name = 'NoLanguageFound';
}

class AppLanguage extends Component {

  constructor(props) {
    super(props);

    this.localeFallback = props.localeFallback

    this.updateLanguage(props.language);

    let languageArray = this.language.split('-');

    let locale = props.locale;

    if (!locale) {
      locale = languageArray[1]
        ? `${languageArray[0]}-${languageArray[1].toUpperCase()}`
        : languageArray[0];
    }

    // save / cache the actual messages file
    this.__messages = props.messages;

    // availableLanguages in a single file
    this.availableLanguages = Object.keys(this.__messages);

    let messages = null;

    if (!this.__messages) {
      throw new InitialMessagesNeeded();
    }

    // gets the availableLanguages in the file
    let availableLanguages = Object.keys(this.__messages);

    // gets the locale data on the messages file
    if (availableLanguages.indexOf(locale) !== -1) {
      messages = this.__messages[locale];
    } else if (availableLanguages.indexOf(languageArray[0]) !== -1) {
      messages = this.__messages[languageArray[0]];
    } else {
      if (this.localeFallback)
        messages = this.__messages[this.localeFallback];
      else {
        throw new NoLanguageFound();
      }
    }

    this.state = {
      messages: messages,
      locale: locale
    }

    this._polyglot = new Polyglot({locale: locale, phrases: messages});
  }

  updateLanguage = (language = null) => {
    if (!language) {
      this.language = ((navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage);
    } else {
      this.language = language;
    }
  }

  updateMessages = (locale = 'en') => {
    let languageArray = this.language.split('-');
    let availableLanguages = Object.keys(this.__messages);

    if (availableLanguages.indexOf(locale) !== -1) {
      return this.__messages[locale];
    } else if (availableLanguages.indexOf(languageArray[0]) !== -1) {
      return this.__messages[languageArray[0]];
    } else {
      if (this.localeFallback) {
        return this.__messages[this.localeFallback];
      } else {
        throw new NoLanguageFound();
      }
    }
  }

  updateLocale = (locale = null, newMessages = null) => {
    let languageArray = this.language.split('-');

    let newLocale = null;

    if (!locale) {
      newLocale = languageArray[1]
        ? `${languageArray[0]}-${languageArray[1].toUpperCase()}`
        : languageArray[0]
    } else {
      newLocale = locale;
    }

    if (newMessages) {
      this.__messages = newMessages;
    }

    let messages = this.updateMessages(newLocale);

    this.setState({locale: newLocale, messages: messages});
  }

  getChildContext() {
    return {
      t: this._polyglot.t.bind(this._polyglot),
      updateLocale: this.updateLocale
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.locale !== nextState.locale) {
      this._polyglot = new Polyglot({phrases: nextState.messages, locale: nextState.locale});
    }
  }

  render() {
    const children = this.props.children;
    return React.Children.only(children);
  }
}

AppLanguage.propTypes = {
  locale: PropTypes.string,
  localeFallback: PropTypes.string,
  language: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};

AppLanguage.childContextTypes = {
  t: PropTypes.func.isRequired,
  updateLocale: PropTypes.func.isRequired
};

// higher order decorator for components that need `t` and updateLocale
export default function translate() {
  return (WrappedComponent) => {
    const _translate = (props, context) => (<WrappedComponent {...props} t={context.t} updateLocale={context.updateLocale}/>);

    _translate.contextTypes = {
      t: PropTypes.func.isRequired,
      updateLocale: PropTypes.func.isRequired
    };

    return _translate;
  };
}

export {AppLanguage, translate};
