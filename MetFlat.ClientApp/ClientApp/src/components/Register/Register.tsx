import React, { Component } from 'react';
import './styles.css';
import {
  MenuItem, TextField, Button, Select, FormControlLabel, Checkbox
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../Sidebar/logo.png'
import { register } from '../../api/accountAPI';
import { store } from '../..';
import { SetUser } from '../../store/auth/actions';

interface IState {
  user: any,
  usernameError: string,
  passwordError: string
}

class Register extends Component<RouteComponentProps, IState> {
  constructor(props) {
    super(props)
    
    this.state = {
      user: {
        name: "",
        password: "",
        age: 0,
        email: ""
      },
      usernameError: "",
      passwordError: ""
    }
  }
  
  
  handleUsernameChange = (property, value) => {
    const user = {
      ...this.state.user,
      [property]: value.target.value,
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
  
  handleRegisterSubmit = (event) => {
    event.preventDefault();

    register(this.state.user).then(res => {
        if(res.status === 200)
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
      <form action="" className="register-container">{/* onSubmit={this.handleRegisterSubmit}>*/}
        <div className="login-form">
            <div className="logo">
                <img className="logo" src={logo} alt="lol"/>
            </div>
            <div className="form-fields">
                <div className="form-head">
                    <label>Create new account</label>
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Name" type="text" variant="filled" onChange={name => this.handleUsernameChange("name", name)} helperText={usernameError} required />
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Age" type="text" variant="filled" onChange={age => this.handleUsernameChange("age", age)} helperText={usernameError} required />
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Email" type="text" variant="filled" onChange={email => this.handleUsernameChange("email", email)} helperText={usernameError} required />
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Password" type="password" variant="filled" onChange={this.handlePasswordChange} helperText={passwordError} required />
                </div>
                <div className="button-box">
                    <Button className="submit-button" type="submit" onClick={this.handleRegisterSubmit}>Create</Button>
                </div>
                <div className="text-container">
                  <label className="just-text">or</label>
                </div>
                <div className="text-container">
                  <Link to="/login" className="just-text register">Already have an account?</Link>
                </div>
            </div>
        </div>
      </form>
    );
  }
}

// const mapStateToProps = (state: IApplicationState): Partial<IAuthState> => {
//   const { user } = state.auth

//   return { user }
// }

// export default connect(mapStateToProps)(Login)
export default Register