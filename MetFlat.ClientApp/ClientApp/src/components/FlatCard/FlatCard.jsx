import React from 'react';
import { 
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography,
} from '@material-ui/core';
import TagContainer from '../TagContainer/TagContainer'
import "./styles.css"
import { Link } from 'react-router-dom';
import { store } from '../..';
import { connect } from 'react-redux';
import { ActivateFlat, DeactivateFlat, DeleteFlat, SetFlat, SetFlatOwner } from '../../store/flats/actions';
import { getUser } from '../../api/accountAPI';
import { activateFlat, deactivateFlat } from '../../api/flatsAPI';

class FlatCard extends React.Component {
  constructor(props){
    super(props)
  }
  
  handleMoreClick = () => {
    store.dispatch(SetFlat(this.props.flat))
    getUser(this.props.flat.ownerId).then(res => {
      if(res.status === 200)
        store.dispatch(SetFlatOwner(res.data))
    })
  }

  handleActivate = () => {
    activateFlat(this.props.flat.id).then(res => {
      if(res.status === 200) {
        store.dispatch(ActivateFlat(this.props.flat.id))
      }
    })
  }

  handleDeactivate = () => {
    deactivateFlat(this.props.flat.id).then(res => {
      if(res.status === 200) {
        store.dispatch(DeactivateFlat(this.props.flat.id))
      }
    })
  }
  
  render () {
    const { flat, user } = this.props

    return(
      <Card className="card">
        <CardActionArea>
          <CardMedia
            className="card-image"
            image={`../images/${flat.id}/${flat.photos[0]?.path}`}
            title="Contemplative Reptile"
            />
          <CardContent>
            <Typography variant="body2" component="h2">
              {flat.address}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {flat.price} UAH / night
            </Typography>
            <TagContainer flat={flat} />
            <Typography variant="body2" color="textSecondary" component="p">
              {flat.description.length > 65 ? flat.description.substr(0, 65) + '...' : flat.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="/flat">
            <Button className="more-button" size="small" onClick={this.handleMoreClick}>
              More
            </Button>
          </Link>
          {user.name === 'Moderator' && 
            <Button className="more-button" size="small" onClick={this.handleDeactivate}>
              {flat.isActive ? "Reject" : "Activate"}
            </Button>
          }
          {user.id === flat.ownerId && 
            <Button className="more-button" size="small" onClick={flat.isActive ? this.handleDeactivate : this.handleActivate}>
              {flat.isActive ? "Deactivate" : "Activate"}
            </Button>
          }
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state.auth

  return { user }
}

export default connect(mapStateToProps)(FlatCard)