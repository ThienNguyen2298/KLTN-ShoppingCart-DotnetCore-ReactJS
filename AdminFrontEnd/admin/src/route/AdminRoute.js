import React from "react";
//
import CategoryManage from '../pages/Manage/categoryManage/CategoryManage';
import OrderDelivering from '../pages/Manage/orderManage/OrderDelivering';
import OrderedManage from '../pages/Manage/orderManage/OrderedManage';
import OrderNotConfirm from '../pages/Manage/orderManage/OrderNotConfirm';
import ProductManage from '../pages/Manage/productManage/ProductManage';
import ProviderManage from '../pages/Manage/providerManage/ProviderManage';
import UserManage from '../pages/Manage/userManage/UserManage';
import StatisticsRevenue from '../pages/Manage/statistical/StatisticsRevenue';
import Header from "../components/common/Header";
import EvaluationManage from '../pages/Manage/evaluationManage/EvaluationManage';
import StatisticsProduct from '../pages/Manage/statistical/StatisticsProduct';
import StatisticsGeneral from "../pages/Manage/statistical/StatisticsGeneral";
import OrderCanceled from "../pages/Manage/orderManage/OrderCanceled";
import MainScreen from "../pages/Manage/orderManage/MainScreen";

//

const AdminRoute = [
    //for admin
    {
       path: "/admin",
       exact: true,
       myComponent: (location, props) => 
       <MainScreen location={location} {...props} />,
    },
    {
      path: "/admin/order-manage/order-success",
      exact: true,
      myComponent: (location, props) => 
      <OrderedManage location={location} {...props} />,
   },
    {
       path: "/admin/category-manage",
       exact: true,
       myComponent: (location, props) => 
      <CategoryManage location={location} {...props} />,
    },
    {
       path: "/admin/order-manage/order-delivering",
       exact: true,
       myComponent: (location, props) => (
          <OrderDelivering location={location} {...props} />
       )
      },
      {
         path: "/admin/order-manage/order-canceled",
         exact: true,
         myComponent: (location, props) => (
            <OrderCanceled location={location} {...props} />
         ),
      },
    {
        path: "/admin/order-manage/order-not-confirm",
       exact: true,
       myComponent: (location, props) => (
          <OrderNotConfirm location={location} {...props} />
       ),
    },
    {
       path: "/admin/product-manage",
       exact: true,
       myComponent: (location, props) => (
          <ProductManage location={location} {...props} />
       ),
    },
    {
       path: "/admin/provider-manage",
       exact: true,
       myComponent: (location, props) => (
          <ProviderManage location={location} {...props} />
       ),
    },
    {
       path: "/admin/user-manage",
       exact: true,
       myComponent: (location, props) => (
          <UserManage location={location} {...props} />
       ),
    },
    {
      path: "/admin/evaluation-manage",
       exact: true,
       myComponent: (location, props) => (
          <EvaluationManage location={location} {...props} />
       ),
    },
    {
        path: "/admin/statistics-revenue",
        exact: true,
        myComponent: (location, props) => (
           <StatisticsRevenue location={location} {...props} />
        ),
     },
     {
      path: "/admin/statistics-product",
      exact: true,
      myComponent: (location, props) => (
         <StatisticsProduct location={location} {...props} />
      ),
   },
   {
      path: "/admin/statistics-general",
      exact: true,
      myComponent: (location, props) => (
         <StatisticsGeneral location={location} {...props} />
      ),
   },
   
    
 ];
 export default AdminRoute;