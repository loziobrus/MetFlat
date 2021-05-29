import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom'
import Profile from '../../components/Profile/Profile'
import AdBanner from '../../components/AdBanner/AdBanner'
import './styles.css';  


class ProfileContainer extends React.Component {
    render() {
        return (
            <div className="result-container">
                <Profile />
                <AdBanner />
            </div>
        )
    }
}

export default ProfileContainer