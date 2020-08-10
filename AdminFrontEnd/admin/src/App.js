import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Chat from './pages/Chat/Chat';
import {
  Switch,
  Route,
  
} from "react-router-dom";
import AdminRoute from './route/AdminRoute';
import LoginRoute from './route/LoginRoute';
import {connect} from 'react-redux';
import PrivateRoute from './route/privateRoute';
import { ThemeProvider } from '@livechat/ui-kit'


const defaultTheme = {
   FixedWrapperMaximized: {
       css: {
           boxShadow: '0 0 1em rgba(0, 0, 0, 0.1)',
       }
   }
 }

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
       <>
       <ThemeProvider theme={defaultTheme}>
       <Switch>
          {resultPagePrivate} {resultPage}
       </Switch>
       <Chat></Chat>
       </ThemeProvider>
       </>
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
