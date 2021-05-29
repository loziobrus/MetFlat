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

const cities = ['Lviv', 'Kyiv', 'Rivne', 'Dnipro']

class Filters extends Component {
    constructor(props){
        super(props)
        this.state = {
            filters: {
              city: "",
              startDate: moment(),
              endDate: moment().add(1, 'days'),
              guestNumber: 2
            }
        }
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
                                        onChange={checkInDate => this.onValueChange("startDate", checkInDate)}
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
                                        value={filters.endtDate}
                                        onChange={checkOutDate => this.onValueChange("endDate", checkOutDate)}
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
                                    onChange={guests => this.onValueChange("guestNumber", guests)}
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
                                    value={filters.guestNumber}
                                    onChange={guests => this.onValueChange("guestNumber", guests)}
                                    >
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
                                    value={filters.guestNumber}
                                    onChange={guests => this.onValueChange("guestNumber", guests)}
                                    >
                                    <MenuItem value={1}>0 UAH</MenuItem>
                                    <MenuItem value={2}>200 UAH</MenuItem>
                                    <MenuItem value={3}>500 UAH</MenuItem>
                                    <MenuItem value={4}>1000 UAH</MenuItem>
                                    <MenuItem value={5}>1500 UAH</MenuItem>
                                    <MenuItem value={6}>2000 UAH</MenuItem>
                                    <MenuItem value={7}>3000 UAH</MenuItem>
                                </Select>
                                <Select
                                    IconComponent={MonetizationOnIcon}
                                    className="value-select filter-button"
                                    value={filters.guestNumber}
                                    onChange={guests => this.onValueChange("guestNumber", guests)}
                                    >
                                    <MenuItem value={1}>0 UAH</MenuItem>
                                    <MenuItem value={2}>200 UAH</MenuItem>
                                    <MenuItem value={3}>500 UAH</MenuItem>
                                    <MenuItem value={4}>1000 UAH</MenuItem>
                                    <MenuItem value={5}>1500 UAH</MenuItem>
                                    <MenuItem value={6}>2000 UAH</MenuItem>
                                    <MenuItem value={7}>3000 UAH</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className="checkbox-container">
                            <label>Addinitionally</label>
                            <div className="checkbox-table">
                                <div className="checkbox-column">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                            />
                                        }
                                        label="TV"
                                        />    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                            />
                                        }
                                        label="Parking"
                                        />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="#BCA5D7"
                                            />
                                        }
                                        label="WIFI"
                                        />    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                            />
                                        }
                                        label="Balcony"
                                        />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="#BCA5D7"
                                            />
                                        }
                                        label="Oven"
                                        />    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                        label="Microwave"
                                        />
                                </div>                                
                                <div className="checkbox-column">
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                        //checked={state.checkedB}
                                        //onChange={handleChange}
                                        name="checkedB"
                                        color="#BCA5D7"
                                        />
                                    }
                                        label="Kitchen"
                                        />    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                            />
                                        }
                                        label="Elevator"
                                        />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="#BCA5D7"
                                            />
                                        }
                                        label="WIth kids"
                                        />    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                            />
                                        }
                                        label="Fridge"
                                        />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="#BCA5D7"
                                            />
                                        }
                                        label="With pets"
                                        />    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            //checked={state.checkedB}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                            />
                                        }
                                        label="Iron"
                                        />
                                </div>
                            </div>
                        </div>
                    </form>
            </header>
        )
    }
}

export default Filters