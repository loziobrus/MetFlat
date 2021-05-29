import React, { Component } from 'react';
import './styles.css';
import {
  MenuItem, TextField, Button, Select, FormControlLabel, Checkbox
} from '@material-ui/core'
import logo from '../Sidebar/logo.png'
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from '../../api/accountAPI'
import { SetUser } from '../../store/auth/actions'
import { store } from '../..'
import { IAuthState } from '../../store/auth/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';


interface IState {
  user: any,
  usernameError: string,
  passwordError: string
}

class Login extends Component<RouteComponentProps & IAuthState, IState> {
  constructor(props) {
    super(props)
    
    this.state = {
      user: {
        username: "",
        password: "",
      },
      usernameError: "",
      passwordError: ""
    }
  }
  
  
  handleUsernameChange = (username) => {
    const user = {
      ...this.state.user,
      username: username.target.value,
    }
    this.setState({ user })
  }
  
  handlePasswordChange = (password) => {
    const user = {
      ...this.state.user,
      password: password.target.value,
    }
    this.setState({ user })  
  }
  
  handleLoginSubmit = (event) => {
    event.preventDefault();

    login(this.state.user).then(res => {
      console.log(res)
      if(res.status == 200)
        {
          store.dispatch(SetUser(res.data))
          this.props.history.push('/')
        } else {
          if(res.data === "User with this username doesn't exist.")
            this.setState({ usernameError: res.data})
          if(res.data === "Wrong password.")
            this.setState({ passwordError: res.data})
        }
      })

  }  
      
  render () {
    const { usernameError, passwordError } = this.state

    return (
      <form action="" className="form-container">{/* onSubmit={this.handleLoginSubmit}>*/}
        <div className="login-form">
            <div className="logo">
                <img className="logo" src={logo} alt="lol"/>
            </div>
            <div className="form-fields">
                <div className="form-head">
                    <label>Login</label>
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Email" type="text" variant="filled" onChange={this.handleUsernameChange} helperText={usernameError} required />
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Password" type="password" variant="filled" onChange={this.handlePasswordChange} helperText={passwordError} required />
                </div>
                <div className="button-box">
                    <Button className="submit-button" type="submit" onClick={this.handleLoginSubmit}>Log in</Button>
                </div>
                <div className="text-container">
                  <label className="just-text">or</label>
                </div>
                <div className="text-container">
                  <Link to="/register" className="just-text register">Create new account</Link>
                </div>
            </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: ApplicationState): Partial<IAuthState> => {
  const { user } = state.auth

  return { user }
}

export default connect(mapStateToProps)(Login)
