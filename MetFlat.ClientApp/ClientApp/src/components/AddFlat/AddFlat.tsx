import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './styles.css';  
import { IFlatState } from '../../store/flats/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { IAuthState } from '../../store/auth/types';
import {
    MenuItem, TextField, Select, FormControlLabel, Checkbox, InputAdornment, Button, Snackbar
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { addFlat } from '../../api/flatsAPI';
import { store } from '../..';
import { compose } from 'redux';

const cities = ['Lviv', 'Kyiv', 'Rivne', 'Dnipro']

interface IState {
    flat: any,
    snackBarOpen: boolean
}

class AddFlat extends React.Component<RouteComponentProps & IFlatState & IAuthState, IState> {
    constructor(props) {
        super(props)

        this.state = {
            flat: {
                id: 0,
                flatValue: 0,
                description: "",
                maxGuests: 0,
                roomCount: 0,
                price: 0,
                isActive: false,
                ownerId: "",
                city: "",
                address: "",
                mainPhoto: "",
                photos: [
                  {
                    id: 0,
                    flatId: 0,
                    path: ""
                  }
                ],
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
            },
            snackBarOpen: false
        }
    }

    componentDidMount = () => {
        const flat = {
            ...this.state.flat,
            ownerId: this.props.user.id
        }

        this.setState({ flat })
    }

    handleSnackBarClose = () => {
        this.setState({ snackBarOpen: false })
    }

    fileHandler = event => {
        const photos = Array.from(event.target.files).map((e: any) => ( { id: 0, flatId: 0, path: e.name } ))

        const flat = {
            ...this.state.flat,
            mainPhoto: photos[0].path,
            photos
        }

        this.setState({ flat })
        console.log(event.target.files)
        console.log(event.target)
        console.log(event)
    }

    handleChangeValue = (property, value) => {
        const flat = {
          ...this.state.flat,
          [property]: value.target.value,
        }
        this.setState({ flat })
    }

    handleNumberValue = (property, value) => {
        const flat = {
          ...this.state.flat,
          [property]: +value.target.value,
        }
        this.setState({ flat })
    }
    
    onCityChange = (e, value) => {
        const flat = {
          ...this.state.flat,
          city: value
        }
    
        this.setState({ flat })
    }

    handleCheckboxChange = event => {
        const flat = {
            ...this.state.flat,
            [event.target.name]: event.target.checked,
          }
          this.setState({ flat })
    }

    handleAddFlat = () => {
        console.log(this.state.flat)
        addFlat(this.state.flat).then(res => {
            if(res.status === 200) {
                this.setState({ snackBarOpen: true })
                this.props.history.push("/myProfile")
            }            
        })
    }

    handleCancel = () => { 
        this.props.history.push("/myProfile")
    }

    render() {
        const { flat, snackBarOpen } = this.state

        return (
            <div className="add-flat-container">
                    <h3 className="user-name">Add new apartment</h3>
                    <div className="fields">
                            <div className="upload-container">
                                <input type="file" onChange={this.fileHandler} multiple />
                            </div>
                            <div className="inputs-container">
                                <div className="flat-input">
                                    <TextField className="input-field" id="filled-basic" label="Flat value" 
                                        InputProps={{ endAdornment: <InputAdornment position="end">m2</InputAdornment> }} variant="filled" 
                                        onChange={flatValue => this.handleNumberValue("flatValue", flatValue)}
                                    />
                                    <TextField className="input-field" id="filled-basic" label="Price" 
                                        InputProps={{ endAdornment: <InputAdornment position="end">UAH</InputAdornment> }} variant="filled" 
                                        onChange={price => this.handleNumberValue("price", price)}
                                    />
                                </div>
                                <div className="flat-input">
                                    <Select
                                        className="value-select filter-button input-field"
                                        value={flat.maxGuests}
                                        onChange={guests => this.handleChangeValue("maxGuests", guests)}
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
                                        className="value-select filter-button input-field"
                                        value={flat.roomCount}
                                        onChange={roomCount => this.handleChangeValue("roomCount", roomCount)}
                                    >
                                        <MenuItem value={1}>1 Room</MenuItem>
                                        <MenuItem value={2}>2 Rooms</MenuItem>
                                        <MenuItem value={3}>3 Rooms</MenuItem>
                                        <MenuItem value={4}>4 Rooms</MenuItem>
                                    </Select>
                                </div>
                                <div className="flat-input">
                                    <Autocomplete
                                        className="city-input input-field location"
                                        style={{ width: 300 }}
                                        options={cities}
                                        renderInput={(params) => <TextField {...params} label="City" variant="filled" />}
                                        onChange={(e, city) => this.onCityChange(e, city)}
                                    />
                                    <TextField className="input-field location" id="filled-basic" label="Address" 
                                        onChange={address => this.handleChangeValue("address", address)} variant="filled" 
                                    />
                                </div>
                            </div>
                            <TextField className="input-field description" id="filled-basic" label="Description" 
                                onChange={description => this.handleChangeValue("description", description)} multiline rows={5} variant="filled" 
                            />
                            <div className="checkbox-container">
                            <h4 className="user-name">Additional features</h4>
                            <div className="checkbox-table">
                                <div className="checkbox-column">
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="tv" /> } label="TV" />    
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="parking" /> } label="Parking" />
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="wifi" /> } label="WIFI" />
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="balcony" /> } label="Balcony" />    
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="oven" /> } label="Oven" />    
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="microwave" /> } label="Microwave" />  
                                </div>  
                                <div className="checkbox-column">
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="kitchen" /> } label="Kitchen" />    
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="elevator" /> } label="Elevator" />    
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="withKids" /> } label="With kids" />   
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="fridge" /> } label="Fridge" />    
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="withPets" /> } label="With pets" />    
                                    <FormControlLabel className="check-box" control={ <Checkbox onChange={this.handleCheckboxChange} name="iron" /> } label="Iron" />   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flat-buttons">
                        <Button className="cancel-button" onClick={this.handleCancel}>Cancel</Button>
                        <Button className="add-button" onClick={this.handleAddFlat}>Add</Button>
                    </div>
                    <Snackbar 
                        open={snackBarOpen} 
                        onClose={this.handleSnackBarClose} 
                        message="Apartment has been added"
                        autoHideDuration={4000} 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }} 
                    /> 
                </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): Partial<IFlatState & IAuthState> => {
    const { flats } = state.flats
    const { user } = state.auth
  
    return { flats, user }
}
  
export default compose(
    connect(mapStateToProps),
    withRouter
)(AddFlat)