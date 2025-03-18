import axios from '../services/axios'

const LOGIN_ENDPOINT = 'login/'

const REGISTER_ENDPOINT = 'register/'

export const loginAccount = async (body) => {
    const { data } = await axios.post(LOGIN_ENDPOINT, body)
    return data
}


export const registerAccount = async (body) => {
    const { data } = await axios.post(REGISTER_ENDPOINT, body)
    return data
}