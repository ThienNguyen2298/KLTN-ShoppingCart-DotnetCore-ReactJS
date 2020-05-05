import React from 'react';
import {Route,Redirect} from 'react-router-dom';

export default function PrivateRoute({isAuthenticated, myComponent: MyComponent, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }, props) =>
          isAuthenticated ? (
            <MyComponent {...props}></MyComponent>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }