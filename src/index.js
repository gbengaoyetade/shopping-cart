import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import App from './App';
import { AppProvider } from './store';
import './index.css';

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider>
        <App />
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
