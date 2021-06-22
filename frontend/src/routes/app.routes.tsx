import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Register from '../pages/Regiser';
import Sales from '../pages/Sales';
import Sizes from '../pages/Sizes';

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/list/:type" exact component={List} />
            <Route path="/register/sales" component={Sales} />
            <Route path="/register/sizes" component={Sizes} />
        </Switch>
    </Layout>
);

export default AppRoutes;