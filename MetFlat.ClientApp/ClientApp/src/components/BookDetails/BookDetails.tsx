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
    rental: any
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
            }
        }
    }

    render() {
        const { rental } = this.state

        return(
            <header>
                    <form className="book-details-container">
                        <div className="book-details">
                            <div className="name-photo">
                                <h4>Dude</h4>
                                <img className="avatar" src={`../images/users/coolio.jpg`} alt="lol" />
                            </div>
                            <div className="user-data">
                                <div className="user-fields">
                                    <label>Age: 27</label>
                                    <label>Location: Lviv</label>
                                    <label>Active: 2 Years</label>
                                </div>
                                <div className="user-fields">
                                    <label>Email: lalalalal</label>
                                    <label>Phone: 9238456</label>
                                </div>
                            </div>
                            <div className="buttons-container">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className="date-container">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            className="date-input filter-button"
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            value={rental.startDate}
                                            onChange={date => console.log(date)}
                                            //onChange={checkInDate => this.onValueChange("startDate", checkInDate)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardDatePicker
                                            disableToolbar
                                            className="date-input filter-button"
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            value={rental.endtDate}
                                            onChange={date => console.log(date)}
                                            //onChange={checkOutDate => this.onValueChange("endDate", checkOutDate)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </div>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="summary">
                                <label>1657 UAH / 2 nights</label>
                                <Button className="book-button">Book</Button>             
                            </div>
                        </div>
                    </form>
            </header>
        )
    }
}


const mapStateToProps = (state: ApplicationState): Partial<IFlatState & IAuthState> => {
    const { flats } = state.flats
    const { user } = state.auth
  
    return { flats, user }
}

export default connect(mapStateToProps)(BookDetails)