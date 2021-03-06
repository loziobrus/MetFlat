import * as React from 'react';
import {
    FormControlLabel, Checkbox
} from '@material-ui/core'
import './styles.css';  
import { connect } from 'react-redux';
import Carousel from 'react-elastic-carousel';


class FlatDetails extends React.Component {
    render() {
        const { flats, user, currentFlat } = this.props

        return (
            <div className="flat-container">
                    <div className="image-container">
                        <Carousel>
                            {currentFlat.photos?.map(p => <img src={`../images/${currentFlat.id}/${p.path}`} />)}
                        </Carousel>
                    </div>
                    <div className="address-price">
                        <div className="address">
                            <h4>Address</h4>
                            <label className="flat-text">{currentFlat.address}, {currentFlat.city}</label>
                        </div>
                        <div className="address">
                            <h4>Price</h4>
                            <label className="flat-text">{currentFlat.price} UAH / night</label>
                        </div>
                    </div>
                    <div className="description">
                        <h4>Description</h4>
                        <label className="flat-text">{currentFlat.roomCount} rooms, {currentFlat.flatValue} m2</label>
                        <p className="flat-text">{currentFlat.description}</p>
                    </div>
                    <div className="feature-container">
                        <h4>Features</h4>
                        <div className="feature-list">
                            {currentFlat.tv &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="TV"
                                />   
                            } 
                            {currentFlat.parking &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Parking"
                                />   
                            }
                            {currentFlat.wifi &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="WIFI"
                                />   
                            }
                            {currentFlat.balcony &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Balcony"
                                />   
                            }   
                            {currentFlat.oven &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Oven"
                                />   
                            }
                            {currentFlat.microwave &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Microwave"
                                />   
                            }    
                            {currentFlat.kitchen &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Kitchen"
                                />   
                            }  
                            {currentFlat.elevator &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Elevator"
                                />   
                            }
                            {currentFlat.withKids &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="With kids"
                                />   
                            }   
                            {currentFlat.fridge &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Fridge"
                                />   
                            }
                            {currentFlat.withPets &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="With pets"
                                />   
                            }
                            {currentFlat.iron &&
                            <FormControlLabel
                                control={ <Checkbox checked disabled /> }
                                label="Iron"
                                />   
                            }   
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { currentFlat } = state.flats
    const { user } = state.auth
  
    return { currentFlat, user }
}
  
export default connect(mapStateToProps)(FlatDetails)