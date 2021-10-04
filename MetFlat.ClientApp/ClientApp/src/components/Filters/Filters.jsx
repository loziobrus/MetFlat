import React, { Component } from 'react'
import {
    MenuItem, TextField, Select, FormControlLabel, Checkbox
} from '@material-ui/core'
import moment from 'moment'
import { Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns'
import './styles.css'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import GroupIcon from '@material-ui/icons/Group';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { store } from '../..';
import { SetFilters, SetFlats } from '../../store/flats/actions';
import { getFlats } from '../../api/flatsAPI';
import { connect } from 'react-redux';


const cities = ['Lviv', 'Kyiv', 'Rivne', 'Dnipro']

class Filters extends Component {
    constructor(props){
        super(props)
        this.state = {
            filters: {
              guestNumber: 2,
              roomCount: 0,
              city: "Lviv",
              maxPrice: 3000,
              minPrice: 0,
              startDate: moment(),
              endDate: moment().add(1, 'days'),
              tv: false,
              wifi: false,
              parking: false,
              balcony: false,
              oven: false,
              microwave: false,
              kitchen: false,
              elevator: false,
              withKids: false,
              withPets: false,
              fridge: false,
              iron: false
            }
        }
    }

    componentDidMount = () => {
        this.setState({ filters: {
            ...this.state.filters,
            city: this.props.filters.city,
            guestNumber: this.props.filters.guestNumber,
            startDate: this.props.filters.startDate,
            endDate: this.props.filters.endDate
        }})
    }

    onDateChange = (property, value) => {
        if(property === "startDate") {
            const filters = {
              ...this.state.filters,
              [property]: value,
              endDate: moment(value).add(1, 'days')
            }
            
            this.setState({ filters })
            store.dispatch(SetFilters(filters))
          } else {
            const filters = {
              ...this.state.filters,
              [property]: value,
            }
            
            this.setState({ filters })
            store.dispatch(SetFilters(filters))
            getFlats(filters).then(res => {
                store.dispatch(SetFlats(res.data))
            })
          }
      }
    
      onGuestNumberChange = (property, value) => {
        const filters = {
          ...this.state.filters,
          [property]: value.target.value
        }
    
        this.setState({ filters })
        store.dispatch(SetFilters(filters))
        getFlats(filters).then(res => {
            store.dispatch(SetFlats(res.data))
        })
    }
    
      onCityChange = (e, value) => {
        const filters = {
          ...this.state.filters,
          city: value
        }
    
        this.setState({ filters })
        store.dispatch(SetFilters(filters))
        getFlats(filters).then(res => {
            store.dispatch(SetFlats(res.data))
        })
    }

    handleCheckboxChange = event => {
        const filters = {
            ...this.state.filters,
            [event.target.name]: event.target.checked,
        }
        this.setState({ filters })
        store.dispatch(SetFilters(filters))
        getFlats(filters).then(res => {
            store.dispatch(SetFlats(res.data))
        })
    }
      

    render() {
        const { filters } = this.state

        return(
            <header>
                    <form className="filters" onSubmit={this.handleSubmit}>
                        <Autocomplete
                            className="city-input"
                            style={{ width: 300 }}
                            options={cities}
                            defaultValue={filters.city}
                            onChange={(e, city) => this.onCityChange(e, city)}
                            renderInput={(params) => <TextField {...params} variant="outlined"></TextField>}
                            />
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
                                        value={filters.startDate}
                                        onChange={checkInDate => this.onDateChange("startDate", checkInDate)}
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
                                        value={filters.endDate}
                                        onChange={checkOutDate => this.onDateChange("endDate", checkOutDate)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                </div>
                            </MuiPickersUtilsProvider>
                            <div className="date-container">
                                <Select
                                    IconComponent={GroupIcon}
                                    className="value-select filter-button"
                                    value={filters.guestNumber}
                                    onChange={guests => this.onGuestNumberChange("guestNumber", guests)}
                                    >
                                    <MenuItem value={1}>1 Guest</MenuItem>
                                    <MenuItem value={2}>2 Guests</MenuItem>
                                    <MenuItem value={3}>3 Guests</MenuItem>
                                    <MenuItem value={4}>4 Guests</MenuItem>
                                    <MenuItem value={5}>5 Guests</MenuItem>
                                    <MenuItem value={6}>6 Guests</MenuItem>
                                    <MenuItem value={7}>7 Guests</MenuItem>
                                    <MenuItem value={8}>8 Guests</MenuItem>
                                </Select>
                                <Select
                                    IconComponent={MeetingRoomIcon}
                                    className="value-select filter-button"
                                    value={filters.roomCount}
                                    onChange={roomCount => this.onGuestNumberChange("roomCount", roomCount)}
                                    >
                                    <MenuItem value={0}>Any</MenuItem>
                                    <MenuItem value={1}>1 Room</MenuItem>
                                    <MenuItem value={2}>2 Rooms</MenuItem>
                                    <MenuItem value={3}>3 Rooms</MenuItem>
                                    <MenuItem value={4}>4 Rooms</MenuItem>
                                </Select>
                            </div>
                            <div className="date-container">
                                <Select
                                    IconComponent={MonetizationOnIcon}
                                    className="value-select filter-button"
                                    value={filters.minPrice}
                                    onChange={minPrice => this.onGuestNumberChange("minPrice", minPrice)}
                                    >
                                    <MenuItem value={0}>0 UAH</MenuItem>
                                    <MenuItem value={200}>200 UAH</MenuItem>
                                    <MenuItem value={500}>500 UAH</MenuItem>
                                    <MenuItem value={1000}>1000 UAH</MenuItem>
                                    <MenuItem value={1500}>1500 UAH</MenuItem>
                                    <MenuItem value={2000}>2000 UAH</MenuItem>
                                </Select>
                                <Select
                                    IconComponent={MonetizationOnIcon}
                                    className="value-select filter-button"
                                    value={filters.maxPrice}
                                    onChange={maxPrice => this.onGuestNumberChange("maxPrice", maxPrice)}
                                    >
                                    <MenuItem value={200}>200 UAH</MenuItem>
                                    <MenuItem value={500}>500 UAH</MenuItem>
                                    <MenuItem value={1000}>1000 UAH</MenuItem>
                                    <MenuItem value={1500}>1500 UAH</MenuItem>
                                    <MenuItem value={2000}>2000 UAH</MenuItem>
                                    <MenuItem value={3000}>3000 UAH</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className="checkbox-container">
                            <label>Addinitionally</label>
                            <div className="checkbox-table">
                                <div className="checkbox-column">
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="tv" color="primary" /> } label="TV" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="parking" color="primary" /> } label="Parking" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="wifi" color="primary" /> } label="WIFI" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="balcony" color="primary" /> } label="Balcony" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="oven" color="primary" /> } label="Oven" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="microwave" color="primary" /> } label="Microwave" />    
                                </div>                                
                                <div className="checkbox-column">
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="kitchen" color="primary" /> } label="Kitchen" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="elevator" color="primary" /> } label="Elevator" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="withKids" color="primary" /> } label="With kids" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="fridge" color="primary" /> } label="Fridge" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="withPets" color="primary" /> } label="With pets" />    
                                    <FormControlLabel control={ <Checkbox onChange={this.handleCheckboxChange} name="iron" color="primary" /> } label="Iron" />    
                                </div>
                            </div>
                        </div>
                    </form>
            </header>
        )
    }
}

const mapStateToProps = state => {
    const { filters } = state.flats
  
    return { filters }
}
  
export default connect(mapStateToProps)(Filters)