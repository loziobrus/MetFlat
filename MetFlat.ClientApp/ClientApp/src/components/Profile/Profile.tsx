import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { Grid } from "@material-ui/core"
import FlatCard from '../FlatCard/FlatCard'
import './styles.css';  
import { IFlatState } from '../../store/flats/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { IAuthState } from '../../store/auth/types';
import AddIcon from '@material-ui/icons/Add';
import FlatList from '../../components/FlatList/FlatList'
import { getFlatsByOwner } from '../../api/flatsAPI';
import { store } from '../..';
import { SetFlats } from '../../store/flats/actions';

interface IState {
    ownerFlats: any
}

class Profile extends React.Component<RouteComponentProps & IFlatState & IAuthState> {
    constructor(props) {
        super(props)

        this.state = {
            ownerFlats: {}
        }
    }

    componentDidMount = async () => {
        getFlatsByOwner(this.props.user.id).then(res => {
            store.dispatch(SetFlats(res.data))
        })
    }

    render() {
        const { flats, user } = this.props

        return (
            <div className="profile-container">
                <div className="user-profile">
                    <div className="header">
                        <h3 className="user-name">{user.name}</h3>
                        <label className="register">Edit profile</label>
                    </div>
                    <div className="user-info">
                        <div className="first-section">
                            <img className="avatar" src={`../images/users/${user.photo}`} alt="lol" />
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
                <div className="apartment-container">
                    <div className="header">
                        <h3 className="user-name">
                            Apartments
                            <AddIcon className="add-icon" fontSize="default"/>
                        </h3>
                    </div>
                    <FlatList />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): Partial<IFlatState & IAuthState> => {
    const { flats } = state.flats
    const { user } = state.auth
  
    return { flats, user }
}
  
export default connect(mapStateToProps)(Profile)