import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom'
import Home from '../Home/Home';
import ResultContainer from '../../containers/ResultContainer/ResultContainer';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer'
import FlatDetailsContainer from '../../containers/FlatDetailsContainer/FlatDetailsContainer'


import Sidebar from '../Sidebar/Sidebar';
import './styles.css';  


class Layout extends React.Component {
    render() {
        return (
            <div className="window-wrapper">
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={ResultContainer} />
                    <Route exact path="/myProfile" component={ProfileContainer} />
                    <Route exact path="/flat" component={FlatDetailsContainer} />
                </Switch>
            </div>
        )
    }
}

export default Layout