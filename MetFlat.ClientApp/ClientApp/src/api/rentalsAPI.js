import axios from "axios"
import moment from 'moment'

export const getRentalsByTenant = id => {
  return axios.get(`https://localhost:44356/api/rental/getByTenant/${id}`).then(res => {
      return res
  })
}

export const getRentalsByOwner = async (id) => {
  return await axios.get(`https://localhost:44356/api/rental/getByOwner/${id}`).then(res => {
      return res
  })
}

export const getPendingRentalsByTenant = id => {
  return axios.get(`https://localhost:44356/api/rental/getPendingByTenant/${id}`).then(res => {
      return res
  })
}

export const getPendingRentalsByOwner = async (id) => {
  return await axios.get(`https://localhost:44356/api/rental/getPendingByOwner/${id}`).then(res => {
      return res
  })
}

export const addRental = async (rental) => {
  const newRental = {
    ...rental,
    startDate: moment(rental.startDate).format('YYYY-MM-DD'),
    endDate: moment(rental.endDate).format('YYYY-MM-DD')
  }

  return await axios.post(`https://localhost:44356/api/rental/addRental`, newRental).then(res => {
    return res
  })
}

export const approveRental = async (id) => {
  return await axios.put(`https://localhost:44356/api/rental/approve/${id}`).then(res => {
    return res
  })
}

export const cancelRental = async (id) => {
  return await axios.put(`https://localhost:44356/api/rental/cancel/${id}`).then(res => {
    return res
  })
}
