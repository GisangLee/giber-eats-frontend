import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
import { LoggedInRouter } from '../routers/logged-in-router';
import { LoggedoutRouter } from '../routers/logged-out-router';


export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  
  return isLoggedIn ? <LoggedInRouter/> : <LoggedoutRouter/>;
};