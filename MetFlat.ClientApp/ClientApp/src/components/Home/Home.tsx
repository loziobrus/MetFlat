import * as React from 'react';
import { connect } from 'react-redux';
import {
  MenuItem, TextField, InputLabel, Select, 
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns'
import './styles.css'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment'
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { addFlat, getFlat, getFlats, deleteFlat, editFlat } from '../../api/flatsAPI'
import { SetFilters, SetFlats } from '../../store/flats/actions'
import { store } from '../..'
import { RouteComponentProps } from "react-router-dom";

const cities = ['Lviv', 'Kyiv', 'Rivne', 'Dnipro', 'Ivano-Frankivsk', 'Kharkiv', 'Lutsk', 'Chernivtsi', 'Malyn', 'Chernihiv', 'Cherkasy', 'Odesa', 'Sumy', 'Uzhhorod', 'Stryi', 'Kolomyia', 'Donetsk']

interface IState {
  filters: any
}

class Home extends React.Component<RouteComponentProps, IState> {
  constructor(props) {
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

  onValueChange = (property, value) => {
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
    }
  }

  onGuestNumberChange = value => {
    const filters = {
      ...this.state.filters,
      guestNumber: value.target.value
    }

    this.setState({ filters })
    store.dispatch(SetFilters(filters))
  }

  onCityChange = (e, value) => {
    const filters = {
      ...this.state.filters,
      city: value
    }

    this.setState({ filters })
    store.dispatch(SetFilters(filters))
  }
  
  handleSubmit = (event) => {
    event.preventDefault();

    const { history } = this.props

    getFlats(this.state.filters).then(res => {
      store.dispatch(SetFlats(res.data))
      history.push("/search")
    })
  }

  render() {
    const { filters } = this.state

    return(
      <div className="content-container">
        <form className="search-container" onSubmit={this.handleSubmit}>
          <Autocomplete
            id="combo-box-demo"
            style={{ width: 300 }}
            options={cities}
            onChange={(e, city) => this.onCityChange(e, city)}
            renderInput={(params) => <TextField {...params} label="Where are you going now?" variant="outlined"><SearchIcon /></TextField>}
            />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            disablePast
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check-in"
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
            label="Check-out"
            value={filters.endDate}
            onChange={checkOutDate => this.onValueChange("endDate", checkOutDate)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            />
            </MuiPickersUtilsProvider>
          <Select
            className="guest-select"
            value={filters.guestNumber}
            onChange={guests => this.onGuestNumberChange(guests)}
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
          <Button variant="contained" type="submit" className="search-button" >
            <CheckIcon fontSize="large"/>
          </Button>
          </form>
      </div>
    )
  }
  
}

export default connect()(Home);
