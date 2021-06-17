import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
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
import { GlobalContext } from './state/GlobalContext';

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
  const { setSocket } = useContext(GlobalContext);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL);
    socket.on('connect', () => {
      console.log('you connected with id : ' + socket.id);
    });
    setSocket(socket);
  }, [setSocket]);

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
