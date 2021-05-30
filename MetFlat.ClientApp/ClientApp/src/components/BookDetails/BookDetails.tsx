import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import { IAuthState } from '../../store/auth/types'
import { IFlatState } from '../../store/flats/types'
import './styles.css'
import { Button } from '@material-ui/core'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface IState {
    rental: any,
    nights: number
}

class BookDetails extends Component<IFlatState & IAuthState, IState> {
    constructor(props) {
        super(props)

        this.state = {
            rental: {
                flatId: 0,
                tenantId: 0,
                rentalStatus: 0,
                startDate: moment(),
                endDate: moment().add(1, 'days'),
                total: 0
            },
            nights: 1
        }
    }

    componentDidMount = () => {
        const total = this.state.nights * this.props.currentFlat.price
        this.setState({ rental: {
            ...this.state.rental,
            total }})
    }

    onValueChange = (property, value) => {
        const { rental } = this.state
        const start = moment(rental.startDate)
        const end = moment(value)
        const nights = Math.round(moment.duration(end.diff(start)).asDays())

        const rentaNew = {
            ...this.state.rental,
            [property]: value,
            total: nights * this.props.currentFlat.price
        }

        this.setState({ rental: rentaNew })
    }

    handleBook = () => {
        const rental = {
            ...this.state.rental,
            flatId: this.props.currentFlat.id,
            total: this.state.rental.endDate.diff(this.state.rental.startDate, 'days') * this.props.currentFlat.price
        }

        this.setState({ rental })

        console.log(this.state.rental)
    }

    render() {
        const { rental, nights } = this.state
        const { flatOwner } = this.props

        return(
            <header>
                    <form className="book-details-container">
                        <div className="book-details">
                            <div className="name-photo">
                                <h4>{flatOwner.name}</h4>
                                <img className="avatar" src={`../images/users/${flatOwner.photo}`} alt="lol" />
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
                                <label>{rental.total} UAH / {nights} nights</label>
                                <Button className="book-button" onClick={this.handleBook}>Book</Button>             
                            </div>
                        </div>
                    </form>
            </header>
        )
    }
}


const mapStateToProps = (state: ApplicationState): Partial<IFlatState & IAuthState> => {
    const { flats, flatOwner, currentFlat } = state.flats
    const { user } = state.auth
  
    return { flats, user, flatOwner, currentFlat }
}

export default connect(mapStateToProps)(BookDetails)