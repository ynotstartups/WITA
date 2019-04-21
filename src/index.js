import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from './redux/store';
import App from './App';
import theme from './material-ui/theme';

// TODO
// import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'https://metaphysics-production.artsy.net/',
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
