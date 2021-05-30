import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom'
import History from '../../components/History/History'
import AdBanner from '../../components/AdBanner/AdBanner'
import './styles.css';  
import { store } from '../..';
import { SetRentals } from '../../store/rentals/actions';
import { getRentalsByTenant } from '../../api/rentalsAPI'


class HistoryContainer extends React.Component {
    componentDidMount = () => {
        getRentalsByTenant("23efce81-3552-4b77-93e8-9e64c3955063").then(res => {
            store.dispatch(SetRentals(res.data))
        })
    }

    render() {
        return (
            <div className="result-container">
                <History />
                <AdBanner />
            </div>
        )
    }
}

export default HistoryContainer