import React from 'react';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import Users from './components/Users';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import { setContext } from 'apollo-link-context';
import Login from './pages/Login';
import IsAuthenticated from './components/IsAuthenticated';
import Home from './pages/Home';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL + '/graphql',
});
const authLink = setContext(async (req) => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  };
});
const link = authLink.concat(httpLink);
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/users">
            <IsAuthenticated>
              <Users />
            </IsAuthenticated>
          </Route>
          <Route path="/landing">
            <IsAuthenticated>
              <div>landing page</div>
            </IsAuthenticated>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <IsAuthenticated>
              <Home />
            </IsAuthenticated>
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
