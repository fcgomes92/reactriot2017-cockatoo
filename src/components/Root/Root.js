import React, {Component} from 'react';
import {Dimmer, Loader, Segment} from 'semantic-ui-react'
import {translate} from 'utils/languages';
import App from 'components/App/App';

class Root extends Component {
  state = {
    loading: true,
    loadingText: "",
    App: null
  }

  componentDidMount() {
    const {t} = this.props;

    this.setState({loadingText: t('loading.loadingApp')})
    import ('../App/App').then((module) => {
      const App = module.default;
      this.setState({loadingText: t('loading.loadedApp')})
      setTimeout(() => {
        this.setState({loading: false, App: App})
      }, 1500);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {loading} = this.state;
    if (!loading) {
      return <App/>;
    } else {
      return (
        <div style={{
          height: "100%"
        }}>
          <Segment style={{
            height: "100%"
          }}>
            <Dimmer active>
              <Loader indeterminate>{this.state.loadingText}</Loader>
            </Dimmer>
          </Segment>
        </div>
      );
    }
  }
}

export default translate()(Root);
