import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import { IAuthState } from '../../store/auth/types'
import { IFlatState } from '../../store/flats/types'
import './styles.css'
import { Button, Dialog, TextField, Snackbar } from '@material-ui/core'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { addRental } from '../../api/rentalsAPI'
import { store } from '../..'
import { login } from '../../api/accountAPI'
import { SetUser } from '../../store/auth/actions'
import { threadId } from 'worker_threads'


interface IState {
    rental: any,
    user: any,
    nights: number,
    loginOpen: boolean,
    snackBarOpen: boolean
}

class BookDetails extends Component<IFlatState & IAuthState, IState> {
    constructor(props) {
        super(props)

        this.state = {
            rental: {
                id: 0,
                flatId: 0,
                tenantId: 0,
                rentalStatus: 0,
                startDate: moment(),
                endDate: moment().add(1, 'days'),
                total: 0
            },
            user: {
                username: "",
                password: "",
            },
            nights: 1,
            loginOpen: false,
            snackBarOpen: false
        }
    }

    componentDidMount = () => {
        const { currentFlat, filters, user } = this.props

        const nights = Math.round(moment.duration(moment(filters.endDate).diff(moment(filters.startDate))).asDays())

        const total = nights * currentFlat.price
        this.setState({ 
            rental: {
                ...this.state.rental,
                flatId: currentFlat.id,
                flatPhoto: currentFlat.mainPhoto,
                address: currentFlat.address,
                total,
                tenantId: user.id,
                startDate: filters.startDate,
                endDate: filters.endDate, 
            },
            nights
        })
    }

    onValueChange = (property, value) => {
        const { rental } = this.state
        const start = moment(rental.startDate)
        const end = moment(value)
        const nights = Math.round(moment.duration(end.diff(start)).asDays())

        if(property === "startDate") {
            const rentaNew = {
                ...this.state.rental,
                [property]: value,
                endDate: moment(value).add(1, 'days'),
                total: nights * this.props.currentFlat.price,
            }
            
            this.setState({ rental: rentaNew, nights })
        } else {
            const rentaNew = {
                ...this.state.rental,
                [property]: value,
                total: nights * this.props.currentFlat.price,
            }
            
            this.setState({ rental: rentaNew, nights })
        }
    }

    handleBook = () => {
        if(this.props.user.id)
        {
            console.log(this.state.rental)
            addRental(this.state.rental).then(res => {
                this.setState({ snackBarOpen: true })
            })
        }
        else
            this.setState({ loginOpen: true })
    }

    handleClose = () => {
        this.setState({ loginOpen: false })
    }

    handleSnackBarClose = () => {
        this.setState({ snackBarOpen: false })
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
          if(res.status == 200)
            {
              store.dispatch(SetUser(res.data))
              
              const rental = {
                  ...this.state.rental,
                  tenantId: this.props.user.id
              }

              this.setState({ rental })
              
              if(this.props.user.id)
              {
                  console.log(this.state.rental)
                  addRental(this.state.rental).then(res => {
                      this.setState({ snackBarOpen: true })
                      this.handleClose()
                  })
              }
              else
                  this.setState({ loginOpen: true })
            }
        })
    }  

    render() {
        const { rental, nights, loginOpen, snackBarOpen } = this.state
        const { flatOwner } = this.props

        return(
            <header>
                    <form className="book-details-container">
                        <div className="book-details">
                            <div className="name-photo">
                                <h4>{flatOwner.name}</h4>
                                <img className="avatar" src={flatOwner.photo ? `../images/users/${flatOwner.photo}` : "../images/users/profile.png"} alt="lol" />
                            </div>
                            <div className="user-data">
                                <div className="user-fields">
                                    <label>Age: {flatOwner.age}</label>
                                    <label>Location: {flatOwner.city}</label>
                                    <label>Active: {flatOwner.active} Years</label>
                                </div>
                                <div className="user-fields">
                                    <label>Email: {flatOwner.email}</label>
                                    <label>Phone: {flatOwner.phoneNumber}</label>
                                </div>
                            </div>
                            <div className="buttons-container">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className="date-container">
                                        <KeyboardDatePicker
                                            autoOk
                                            disablePast
                                            disableToolbar
                                            className="date-input filter-button"
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            value={rental.startDate}
                                            onChange={checkInDate => this.onValueChange("startDate", checkInDate)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardDatePicker
                                            autoOk
                                            disablePast
                                            disableToolbar
                                            className="date-input filter-button"
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            value={rental.endDate}
                                            onChange={checkOutDate => this.onValueChange("endDate", checkOutDate)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </div>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="summary">
                                <label>{rental.total} UAH / {nights} {nights > 1 ? "nights" : "night"}</label>
                                <Button className="book-button" onClick={this.handleBook}>Book</Button>             
                            </div>
                            <Dialog open={loginOpen} onClose={this.handleClose}>
                                <form action="" className="form-container">{/* onSubmit={this.handleLoginSubmit}>*/}
                                    <div className="login-book">
                                        <div className="form-fields">
                                            <div className="form-head">
                                                <label>Please log in</label>
                                            </div>
                                            <div className="input-box">
                                                <TextField className="login-input" label="Email" type="text" variant="filled" onChange={this.handleUsernameChange} required />
                                            </div>
                                            <div className="input-box">
                                                <TextField className="login-input" label="Password" type="password" variant="filled" onChange={this.handlePasswordChange} required />
                                            </div>
                                            <div className="button-box">
                                                <Button className="submit-button" type="submit" onClick={this.handleLoginSubmit}>Log in</Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Dialog>
                        </div>
                    </form>
                    <Snackbar 
                        open={snackBarOpen} 
                        onClose={this.handleSnackBarClose} 
                        message="Book request sent"
                        autoHideDuration={4000} 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }} 
                    />   
            </header>
        )
    }
}


const mapStateToProps = (state: ApplicationState): Partial<IFlatState & IAuthState> => {
    const { flats, flatOwner, currentFlat, filters } = state.flats
    const { user } = state.auth
  
    return { flats, user, flatOwner, currentFlat, filters }
}

export default connect(mapStateToProps)(BookDetails)