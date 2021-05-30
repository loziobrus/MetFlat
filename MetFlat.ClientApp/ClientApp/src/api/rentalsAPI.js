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

export const addRental = newRental =>
  axios.post(`https://localhost:44356/api/rental`, newRental)

