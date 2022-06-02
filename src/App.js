import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { UserContextProvider } from './context/User';
import Home from './pages/Home';
import OneBook from './pages/OneBook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';

const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log("token" ,token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/book/:id" element={<OneBook/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/logout" element={<Logout/>}/>
          </Routes>
        </UserContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;