import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Customers from '../pages/customers';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Payments from '../pages/Payments';
import Providers from '../pages/Providers';
import Register from '../pages/Regiser';
import Sales from '../pages/Sales';
import Sizes from '../pages/Sizes';
import Users from '../pages/Users';

const AppRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/list/:type" exact component={List} />
      <Route path="/register/sales" component={Sales} />
      <Route path="/register/sizes" component={Sizes} />
      <Route path="/register/payments" component={Payments} />
      <Route path="/register/providers" component={Providers} />
      <Route path="/register/customers" component={Customers} />
      <Route path="/register/users" component={Users} />
    </Switch>
  </Layout>
);

export default AppRoutes;
