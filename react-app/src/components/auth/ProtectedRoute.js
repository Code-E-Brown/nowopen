import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoginForm from '../LoginFormModal/LoginForm'

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user) ? props.children : <Redirect to='/' />}
    </Route>
  )
};


export default ProtectedRoute;
