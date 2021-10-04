import * as React from 'react';
import { Switch } from 'react-router';
import { connect } from 'react-redux'
import History from '../../components/History/History'
import AdBanner from '../../components/AdBanner/AdBanner'
import './styles.css';  
import { store } from '../..';
import { SetRentals } from '../../store/rentals/actions';
import { getRentalsByTenant } from '../../api/rentalsAPI'


class HistoryContainer extends React.Component {
    componentDidMount = () => {
        getRentalsByTenant(this.props.user.id).then(res => {
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

const mapStateToProps = state => {
    const { user } = state.auth
  
    return { user }
}

export default connect(mapStateToProps)(HistoryContainer)