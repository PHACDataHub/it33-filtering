import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";


const get_apollo_http_link = () => {
  if (process.env.REACT_APP_CODESPACE_NAME){
    return createHttpLink({
      uri: `https://${
       process.env.REACT_APP_CODESPACE_NAME
      }-${
        process.env.REACT_APP_GQL_PORT
      }.${
        process.env.REACT_APP_CODESPACES_PORT_FORWARDING_DOMAIN
      }/graphql `,
      headers: {
        "X-Github-Token": process.env.REACT_APP_CODESPACES_TOKEN
      },
    });
  }
  
  return createHttpLink({
    uri: `http://localhost:${process.env.REACT_APP_GQL_PORT}/graphql`,
  });
}

const client = new ApolloClient({
  link: get_apollo_http_link(),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
