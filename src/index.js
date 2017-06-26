import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'components/Root/Root';
import {AppLanguage} from 'utils/languages';
import 'settings';
import {__messages} from 'strings';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppLanguage messages={__messages} localeFallback="en">
  <Root/>
</AppLanguage>, document.getElementById('root'));

// registerServiceWorker();
