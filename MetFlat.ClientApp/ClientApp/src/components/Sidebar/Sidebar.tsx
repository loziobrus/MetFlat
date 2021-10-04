import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './styles.css';  
import logo from './logo.png'
import { ApplicationState } from '../../store';
import { IAuthState } from '../../store/auth/types';
import { connect } from 'react-redux';

class Sidebar extends Component<IAuthState> {
    constructor(props){
        super(props)
        
    }

    render() {
        const { user } = this.props

        return(
            <header className="sidebar">
                <div className="tab-container">
                    <Link to="/">
                        <img className="logo" src={logo} alt="lol"/>
                    </Link>
                    <Link to="/login">
                        <label className="sidebar-name">{user.name ? user.name : "Log in"}</label>
                    </Link>
                    {user.name !== 'Moderator' && 
                        <Link to="/">
                            <BookmarkBorderIcon className="iconClass" fontSize="large"/>
                            <label className="sidebar-tab">Book</label>
                        </Link>
                    }
                    <Link to="/myProfile">
                        <AccountCircleIcon className="iconClass" fontSize="large"/>
                        <label className="sidebar-tab">My Profile</label>
                    </Link>
                    {user.name !== 'Moderator' && 
                        <Link to="/history">
                            <HistoryIcon className="iconClass" fontSize="large"/>
                            <label className="sidebar-tab">History</label>
                        </Link>
                    }
                </div>
                <Link to="/login">
                    <ExitToAppIcon className="iconClass" fontSize="large"/>
                    <label className="sidebar-tab">Log out</label>
                </Link>
            </header>
        )
    }
}

const mapStateToProps = (state: ApplicationState): Partial<IAuthState> => {
    const { user } = state.auth
  
    return { user }
}
  
export default connect(mapStateToProps)(Sidebar)