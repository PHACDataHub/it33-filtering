import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: (() => {
    if (process.env.REACT_APP_IS_IN_CODESPACES === "true"){
      return process.env.REACT_APP_CODESPACES_GQL_URL;
    } else if (process.env.REACT_APP_LOCAL_GQL_URL) {
      return process.env.REACT_APP_LOCAL_GQL_URL
    } else {
      throw new Error(
        "No GraphQL URL env var has been set! For local development, set `REACT_APP_LOCAL_GQL_URL`." + 
        "For GitHub codespaces, set `REACT_APP_IS_IN_CODESPACES=true` and `REACT_APP_CODESPACES_GQL_URL`."
      );
    }
  })(),
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
