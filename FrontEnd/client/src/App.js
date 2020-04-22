import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
//components
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

import Cart from './pages/Cart';
import Persional from './pages/Persional';



function App() {
  return (
    <>
      <Navbar></Navbar>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product-detail/:productId" component={ProductDetail} />
        <Route exact path="/Cart" component={Cart} />
        <Route exact path="/Persional/:userId" component={Persional} />
      </Switch>
      
    </>
      
    
  );
}

export default App;
