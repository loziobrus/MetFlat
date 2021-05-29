import React, { Component } from 'react';
import './styles.css';
import {
  MenuItem, TextField, Button, Select, FormControlLabel, Checkbox
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../Sidebar/logo.png'

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



    // login(this.state.user).then(res => {
    //     if(res.status === 'Success')
    //     {
    //       store.dispatch(SetUser(res.data))
    //       userRole = res.data.role
    //       if(userRole === Roles.Admin)
    //        history.push('/admin/companies')
    //       else if(userRole === Roles.CompanyAdmin)
    //        history.push('/admin/employees')
    //     } else {
    //       if(res.data === "User with this username doesn't exist.")
    //         this.setState({ usernameError: res.data})
    //       if(res.data === "Wrong password.")
    //         this.setState({ passwordError: res.data})
    //     }
    //   })

  }  
      
  render () {
    const { usernameError, passwordError } = this.state

    return (
      <form action="" className="register-container">{/* onSubmit={this.handleLoginSubmit}>*/}
        <div className="login-form">
            <div className="logo">
                <img className="logo" src={logo} alt="lol"/>
            </div>
            <div className="form-fields">
                <div className="form-head">
                    <label>Create new account</label>
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Name" type="text" variant="filled" onChange={this.handleUsernameChange} helperText={usernameError} required />
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Age" type="text" variant="filled" onChange={this.handleUsernameChange} helperText={usernameError} required />
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Email" type="text" variant="filled" onChange={this.handleUsernameChange} helperText={usernameError} required />
                </div>
                <div className="input-box">
                    <TextField className="login-input" label="Password" type="password" variant="filled" onChange={this.handlePasswordChange} helperText={passwordError} required />
                </div>
                <div className="button-box">
                    <Button className="submit-button" type="submit" onClick={this.handleLoginSubmit}>Create</Button>
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