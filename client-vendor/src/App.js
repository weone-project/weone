import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "../src/routes/index";
import { ApolloProvider } from "@apollo/client";
import client from "./config/config";

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
