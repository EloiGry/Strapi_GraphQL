import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import Home from './pages/Home';
import OneBook from './pages/OneBook';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})
const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/book/:id" element={<OneBook/>}/>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;