import React from "react";

import Login from '../pages/Login';

const LoginRoute = [
   {
      path: "/",
      exact: true,
      component: () => <Login />
   }
];
export default LoginRoute;
