import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'
import { Grid } from "@material-ui/core"
import FlatCard from '../FlatCard/FlatCard'
import './styles.css';  
import { IFlatState } from '../../store/flats/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { IAuthState } from '../../store/auth/types';
import AddIcon from '@material-ui/icons/Add';
import FlatList from '../../components/FlatList/FlatList'
import { getFlatsByOwner, getInactiveFlats } from '../../api/flatsAPI';
import { store } from '../..';
import { SetFlats } from '../../store/flats/actions';
import RequestCard from '../RequestCard/RequestCard'
import { getPendingRentalsByOwner, getPendingRentalsByTenant } from '../../api/rentalsAPI';
import { SetPendingOwnerRentals, SetPendingTenantRentals } from '../../store/rentals/actions';
import { IRentalState } from '../../store/rentals/types';

interface IState {
    ownerFlats: any
}

class Profile extends React.Component<RouteComponentProps & IFlatState & IAuthState & IRentalState> {
    constructor(props) {
        super(props)

        this.state = {
            ownerFlats: {}
        }
    }

    componentDidMount = async () => {
        if(this.props.user.name !== 'Moderator') {
            getFlatsByOwner(this.props.user.id).then(res => {
                store.dispatch(SetFlats(res.data))
            })
            
            getPendingRentalsByOwner(this.props.user.id).then(res => {
                store.dispatch(SetPendingOwnerRentals(res.data))
            })
            
            getPendingRentalsByTenant(this.props.user.id).then(res => {
                store.dispatch(SetPendingTenantRentals(res.data))
            })
        } else {
            getInactiveFlats().then(res => {
                store.dispatch(SetFlats(res.data))
            })
        }
    }

    render() {
        const { flats, user, pendingOwner, pendingTenant } = this.props

        return (
            <div className="profile-container">
                <div className="user-profile">
                    <div className="header">
                        <h3 className="user-name">{user.name}</h3>
                        <label className="register">Edit profile</label>
                    </div>
                    <div className="user-info">
                        <div className="first-section">
                            <img className="avatar" src={user.photo ? `../images/users/${user.photo}` : "../images/users/profile.png"} alt="lol" />
                            <div className="user-data">
                                <div className="user-fields">
                                    <label>Age: {user.age}</label>
                                    <label>Location: {user.city}</label>
                                    <label>Active: {user.active} Years</label>
                                </div>
                                <div className="user-fields">
                                    <label>Email: {user.email}</label>
                                    <label>Phone: {user.phoneNumber}</label>
                                </div>
                            </div>
                        </div>
                        <div className="bio">
                            <h4>Bio</h4>
                            <p>{user.bio}</p>
                        </div>
                    </div>
                </div>
                {(flats.length > 0 && user.name !== 'Moderator') &&
                    <div className="request-container">
                        <div className="header">
                            <h3 className="user-name">Requests</h3>
                        </div>
                        {pendingOwner.length > 0 ? pendingOwner.map(r => <RequestCard rental={r} />) : 
                            <div className="empty-list">
                                <h4>
                                    No new requests
                                </h4>
                            </div>
                        }
                    </div>
                }
                {user.name !== 'Moderator' && 
                    <div className="request-container">
                        <div className="header">
                            <h3 className="user-name">Pending</h3>
                        </div>
                        {pendingTenant.length > 0 ? pendingTenant.map(r => <RequestCard rental={r} />) : 
                            <div className="empty-list">
                                <h4>
                                    No pending requests
                                </h4>
                            </div>
                        }
                    </div>
                }
                {user.name !== 'Moderator' && 
                    <div className="apartment-container">
                        <div className="header">
                            <h3 className="user-name">
                                Apartments
                                <Link to="/addFlat">
                                    <AddIcon className="add-icon" fontSize="default"/>
                                </Link>
                            </h3>
                        </div>
                        <FlatList />
                    </div>
                }
                {user.name === 'Moderator' && 
                    <div className="apartment-container">
                        <div className="header">
                            <h3 className="user-name">
                                Pending apartments
                            </h3>
                        </div>
                        <FlatList />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): Partial<IFlatState & IAuthState & IRentalState> => {
    const { flats } = state.flats
    const { user } = state.auth
    const { pendingOwner, pendingTenant } = state.rentals
  
    return { flats, user, pendingOwner, pendingTenant }
}
  
export default connect(mapStateToProps)(Profile)