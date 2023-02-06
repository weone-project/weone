// import logo from './logo.svg';
// import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from '../src/routers';
import client  from './config/apolloConfig'
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router}/>
    </ApolloProvider>
  );
}

export default App;
