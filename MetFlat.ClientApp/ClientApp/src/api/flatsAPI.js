import axios from "axios"
import moment from 'moment'

export const getFlats = async (filters) => {
    const formattedFilters = {
        ...filters,
        startDate: moment(filters?.startDate).format("MM/DD/YYYY"),
        endDate: moment(filters?.endDate).format("MM/DD/YYYY"),
      };

    return await axios.get(`https://localhost:44356/api/flat`, { params: formattedFilters }).then(res => {
        return res
    })
}

export const getInactiveFlats = async () => {
  return await axios.get(`https://localhost:44356/api/flat/inactive`).then(res => {
      return res
  })
}

export const getFlatsByOwner = async (id) => {
  return await axios.get(`https://localhost:44356/api/flat/getByOwner/${id}`).then(res => {
      return res
  })
}
export const getFlat = id => axios.get(`https://localhost:44356/api/flat/${id}`)

export const editFlat = (id, newFlat) =>
  axios.put(`https://localhost:44356/api/flat/${id}`, newFlat)

export const addFlat = async newFlat => {
  return await axios.post(`https://localhost:44356/api/flat/addFlat`, newFlat).then(res => {
    return res
  })
}

export const deleteFlat = id => axios.delete(`https://localhost:44356/api/flat/${id}`)

export const activateFlat = async id => {
  return await axios.put(`https://localhost:44356/api/flat/activate/${id}`).then(res => {
    return res
  })
}

export const deactivateFlat = async id => {
  return await axios.put(`https://localhost:44356/api/flat/deactivate/${id}`).then(res => {
    return res
  })
}