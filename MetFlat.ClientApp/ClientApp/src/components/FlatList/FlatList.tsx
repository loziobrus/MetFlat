import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { Grid } from "@material-ui/core"
import FlatCard from '../FlatCard/FlatCard'
import './styles.css';  
import { IFlatState } from '../../store/flats/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

class FlatList extends React.Component<IFlatState> {
    render() {
        const { flats } = this.props

        return (
            <div className="list-container">
                <Grid container>
                    {flats.map(f => {
                        return(
                            <Grid item xs={4}>
                                <FlatCard flat={f}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): Partial<IFlatState> => {
    const { flats } = state.flats
  
    return { flats }
  }
  
  export default connect(mapStateToProps)(FlatList)