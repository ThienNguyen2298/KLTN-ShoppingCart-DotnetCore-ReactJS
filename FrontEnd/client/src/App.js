import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
//components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer'
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import Cart from './pages/Cart';
import Persional from './pages/Persional';
import { BackTop } from 'antd';
import {ArrowUpOutlined} from '@ant-design/icons';
import ResetPassword  from './components/AuthModal/ResetPassword/ResetPassword';
import Chat from './components/chat/chat';
import { ThemeProvider } from '@livechat/ui-kit'
// Set the locale for every react-moment instance to French.

import 'moment-timezone';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  textAlign: 'center',
  fontSize: 14,
  backgroundColor: '#389e0d',
  color: '#fff',
  
};
const displayBlock={
  display: 'inline-block',
}
const displayNone={
  display: 'none',
}
const defaultTheme = {
  FixedWrapperMaximized: {
      css: {
          boxShadow: '0 0 1em rgba(0, 0, 0, 0.1)',
      }
  }
}
function App() {
  return (
    <>
      <div style={window.location.pathname.includes('ResetPassword') ? displayNone : null}>
      <ThemeProvider theme={defaultTheme}>
      <Navbar></Navbar>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product-detail/:productId" component={ProductDetail} />
        <Route exact path="/Cart" component={Cart} />
        <Route exact path="/Persional/:userId" component={Persional} />
        <Route exact path="/search/" component={Search} />
      </Switch>
      <Chat></Chat>
      
      <Footer></Footer>
      </ThemeProvider>
      <BackTop>
        
        <div style={style}><ArrowUpOutlined style={{ fontSize: '16px'}}/></div>
      </BackTop>
      </div>
      <Route exact path="/ResetPassword/" component={ResetPassword} />
      
    </>
      
    
  );
}

export default App;
