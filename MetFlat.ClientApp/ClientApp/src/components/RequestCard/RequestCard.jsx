import React from 'react';
import { 
  Card, 
  Button, 
  CardContent, 
  CardMedia, 
  Typography,
  Snackbar
} from '@material-ui/core';
import "./styles.css"
import { connect } from 'react-redux';
import moment from 'moment'
import { approveRental, cancelRental } from '../../api/rentalsAPI';
import { RemovePendingOwnerRental, RemovePendingTenantRental } from '../../store/rentals/actions';
import { store } from '../..';

class RequestCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      snackBarOpen: false,
      snackBarMessage: ""
    }
  }
  
  handleCancel = () => {
    cancelRental(this.props.rental.id).then(res => {
      if(res.status === 200) {
        store.dispatch(RemovePendingTenantRental(this.props.rental.id))
        this.setState({ snackBarOpen: true, snackBarMessage: "Book has been canceled" })
      }
    })
  }

  handleReject = () => {
    cancelRental(this.props.rental.id).then(res => {
      if(res.status === 200) {
        store.dispatch(RemovePendingOwnerRental(this.props.rental.id))
        this.setState({ snackBarOpen: true, snackBarMessage: "Request has been rejected" })
      }
    })
  }

  handleConfirm = () => {
    approveRental(this.props.rental.id).then(res => {
      if(res.status === 200) {
        store.dispatch(RemovePendingOwnerRental(this.props.rental.id))
        this.setState({ snackBarOpen: true, snackBarMessage: "Request has been confirmed" })
      }
    })
  }

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false })
  }

  render () {
    const { rental, user } = this.props
    const { snackBarMessage, snackBarOpen } = this.state

    return(
      <Card className="card">
        <div className="rental-card">
          <CardMedia
            className="card-image"
            image={`../images/${rental.flatId}/${rental.flatPhoto}`}
          />
          <CardContent className="rental-content">
            <div className="rental-info">
              <Typography variant="body2" component="h2">
                {rental.address}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {moment(rental.startDate).format("DD MMM YYYY")} - {moment(rental.endDate).format("DD MMM YYYY")}
              </Typography>
              <Typography variant="body2" component="h2">
                Total: {rental.total} UAH
              </Typography>
            </div>
              {user.id !== rental.tenantId &&
                <div className="request-buttons">
                    <Button className="cancel-button" onClick={this.handleReject}>Reject</Button>
                    <Button className="add-button" onClick={this.handleConfirm}>Confirm</Button>
                </div>
              }
              {user.id === rental.tenantId &&
                <div className="cancel-buttons">
                  <Typography variant="body2" component="h4">
                    Waiting for response
                  </Typography>
                  <Button className="cancel-button" onClick={this.handleCancel}>Cancel</Button>
                </div>
              }
          </CardContent>
          <Snackbar 
              open={snackBarOpen} 
              onClose={this.handleSnackBarClose} 
              message={snackBarMessage}
              autoHideDuration={4000} 
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
              }} 
          /> 
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state.auth

  return { user }
}

export default connect(mapStateToProps)(RequestCard)