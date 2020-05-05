import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AdminRoute from './route/AdminRoute';
import LoginRoute from './route/LoginRoute';
import {connect} from 'react-redux';
import PrivateRoute from './route/privateRoute';




class App extends Component {
  
  showContent = (isAuthenticated, LoginRoute, AdminRoute) => {
    let resultPage = null;
    let resultPagePrivate = null;
    if (LoginRoute.length > 0) {
       resultPage = LoginRoute.map((route, index) => {
          return (
             <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => route.component(props)}
             />
          );
       });
    }
    if (AdminRoute.length > 0) {
       resultPagePrivate = AdminRoute.map((adminItemRoute, index) => {
          return (
             <PrivateRoute
                key={index + LoginRoute.length}
                path={adminItemRoute.path}
                exact={adminItemRoute.exact}
                myComponent={adminItemRoute.myComponent}
                isAuthenticated={isAuthenticated}
             />
             
          );
       });
    }
    return (
       <Switch>
          {resultPagePrivate} {resultPage}
       </Switch>
    );
 };
  
  render() {
     const {isAuthenticated} = this.props;
    return (
       <>
          {
            this.showContent(isAuthenticated,LoginRoute, AdminRoute)
          }
       </>
    );
 }
}



const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.isAuthenticated
   }
}
export default connect(mapStateToProps,null)(App);
