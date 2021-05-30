import React from 'react';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography,
} from '@material-ui/core';
import "./styles.css"
import moment from 'moment'

class RentalCard extends React.Component { 
  render () {
    const { rental } = this.props

    return(
      <Card className="card">
        <div className="rental-card">
          <CardMedia
            className="card-image"
            image={`../images/${rental.flatId}/${rental.flatPhoto}`}
            title="Contemplative Reptile"
            />
          <CardContent className="rental-content">
            <div className="rental-info">
              <Typography variant="body2" component="h2">
                {rental.address}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {moment(rental.startDate).format("DD MMM YYYY")} - {moment(rental.endDate).format("DD MMM YYYY")}
              </Typography>
            </div>
            <h5>Total: {rental.total} UAH</h5>
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default RentalCard