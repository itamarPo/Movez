import { postRequest ,getRequest} from './api_calls'
// accept env variables
// import dotenv from 'dotenv'
// dont = dotenv.config()
// const {URL} = process.env

const URL = "http://10.0.2.2:3000"

export const register = async (username, email, password) => {
    const body = {
        username,
        email,
        password
    }
    try {
        return postRequest(`${URL}/users/register`, body)
    } catch (error) {
        console.log(error)
    }
}

export const login = async (username, password) => {
    const body = {
        username,
        password
    }
    try {
        return await postRequest(`${URL}/users/login`, body)

    } catch (error) {
        console.log(error)
    }
}

export const getProfile = async (token) => {
    try {
        console.log("token",token)
        const res =  await getRequest(`${URL}/`, token)
        console.log("res",res)
        return res
    } catch (error) {
        console.log(error)
    }
}