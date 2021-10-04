import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Login/Login'
import Register from './components/Register/Register'


import './custom.css'

export default () => (
    <div>

        {/* <Layout /> */}
        <Route exact path='/(|search|myProfile|flat|history|addFlat)' component={Layout} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </div>
);
