import {
    ApolloClient,
    InMemoryCache,
    makeVar,
  } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";

  const tokenFromLocalStorage = localStorage.getItem(LOCALSTORAGE_TOKEN);
  export const isLoggedInVar = makeVar(Boolean(tokenFromLocalStorage));

  export const authToken = makeVar(tokenFromLocalStorage);

  export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            isLoggedIn: {
              read() {
                return isLoggedInVar();
              }
            },
            token: {
              read() {
                return authToken();
              }
            },
          }
        }
      }
    })
  });