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
import { SetFlat } from '../../store/flats/actions';

class FlatCard extends React.Component {
  constructor(props){
    super(props)
  }
  
  handleMoreClick = () => {
    store.dispatch(SetFlat(this.props.flat))
  }
  
  render () {
    const { flat } = this.props

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
              {flat.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="/flat">
            <Button className="more-button" size="small" onClick={this.handleMoreClick}>
              More
            </Button>
          </Link>
        </CardActions>
      </Card>
    )
  }
}

export default FlatCard