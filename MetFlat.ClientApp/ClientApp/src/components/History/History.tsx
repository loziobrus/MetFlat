import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { Grid } from "@material-ui/core"
import FlatCard from '../FlatCard/FlatCard'
import './styles.css';  
import { IFlatState } from '../../store/flats/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { IAuthState } from '../../store/auth/types';
import {
    MenuItem, TextField, InputLabel, Select, 
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import './styles.css'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment'
import { getFlatsByOwner } from '../../api/flatsAPI';
import { store } from '../..';
import { SetFlats } from '../../store/flats/actions';
import { IRentalState } from '../../store/rentals/types';
import RentalCard from '../RentalCard/RentalCard'

interface IState {
    filters: any
}

class History extends React.Component<RouteComponentProps & IRentalState & IAuthState, IState> {
    constructor(props) {
        super(props)

        this.state = {
            filters: {
                type: 1,
                startDate: moment(),
                endDate: moment().add(1, 'days')
            }
        }
    }

    componentDidMount = async () => {
        getFlatsByOwner(this.props.user.id).then(res => {
            store.dispatch(SetFlats(res.data))
        })
    }

    onValueChange = (property, value) => {
        const filters = {
          ...this.state.filters,
          [property]: value
        }
    
        this.setState({ filters })
    }

    onTypeChange = value => {
        const filters = {
          ...this.state.filters,
          type: value.target.value
        }
    
        this.setState({ filters })
    }

    render() {
        const { rentals, user } = this.props
        const { filters } = this.state

        return (
            <div className="history-container">
                <div className="history-filters">
                    <Select
                        className="guest-select"
                        value={1}
                        onChange={type => this.onTypeChange(type)}
                    >
                        <MenuItem value={1}>Rentals</MenuItem>
                        <MenuItem value={2}>Leases</MenuItem>
                    </Select>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk
                            disablePast
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start date"
                            value={filters.startDate}
                            onChange={checkInDate => this.onValueChange("startDate", checkInDate)}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            autoOk
                            disablePast
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="End date"
                            value={filters.endDate}
                            onChange={checkOutDate => this.onValueChange("endDate", checkOutDate)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="rental-list">
                    {rentals.map(r => <RentalCard rental={r}/>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): Partial<IRentalState & IAuthState> => {
    const { rentals } = state.rentals
    const { user } = state.auth
  
    return { rentals, user }
}
  
export default connect(mapStateToProps)(History)