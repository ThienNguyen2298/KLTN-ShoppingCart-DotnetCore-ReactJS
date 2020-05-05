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

//

const AdminRoute = [
    //for admin
    {
       path: "/admin",
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
        path: "/admin/statistics-revenue",
        exact: true,
        myComponent: (location, props) => (
           <StatisticsRevenue location={location} {...props} />
        ),
     },
    
 ];
 export default AdminRoute;