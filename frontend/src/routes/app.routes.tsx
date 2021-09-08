import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Customers from '../pages/Customers';
import Dashboard from '../pages/Dashboard';
import ListPurchases from '../pages/ListPurchases';
import ListSales from '../pages/ListSales';
import Payments from '../pages/Payments';
import Products from '../pages/Products';
import Providers from '../pages/Providers';
import Purchases from '../pages/Purchases';
import Register from '../pages/Regiser';
import Reports from '../pages/Reports';
import Sales from '../pages/Sales';
import Sizes from '../pages/Sizes';
import Users from '../pages/Users';

const AppRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/reports" exact component={Reports} />
      <Route path="/list/exit-balance/:id?" component={ListPurchases} />
      <Route path="/list/entry-balance/:id?" component={ListSales} />
      <Route path="/register/sales" component={Sales} />
      <Route path="/register/sizes" component={Sizes} />
      <Route path="/register/payments" component={Payments} />
      <Route path="/register/providers" component={Providers} />
      <Route path="/register/customers" component={Customers} />
      <Route path="/register/products" component={Products} />
      <Route path="/register/purchases" component={Purchases} />
      <Route path="/register/users" component={Users} />
    </Switch>
  </Layout>
);

export default AppRoutes;
