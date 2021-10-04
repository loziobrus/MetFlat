import axios from "axios"

export const getUser = async (id) => {
    return await axios.get(`https://localhost:44356/api/account/${id}`).then(res => {
        return res
    })
}

export const login = async (user) => {
    return await axios.post(`https://localhost:44356/api/account/login`, user).then(res => {
        return res
    })
}

export const register = async (user) => {
    return await axios.post(`https://localhost:44356/api/account/register`, user).then(res => {
        return res
    })
}