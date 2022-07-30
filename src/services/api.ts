import axios from 'axios'
import { Params } from 'react-router-dom'

const API_URL = 'https://nest-api-app.herokuapp.com/api/v1/'
// const API_URL = 'http://localhost:3000/api/v1/'

function authHeader() {
  const user = JSON.parse(localStorage.getItem('user') as string)

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }
  } else {
    return {}
  }
}

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    // @ts-ignore
    Authorization: authHeader().Authorization
  }
})

async function signup(payload: any) {
  const response = await instance.post('auth/signup', payload)

  return response.data
}

async function login(payload: any) {
  const response = await instance.post('auth/login', payload)
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data))
    window.location.reload()
  }
  return response.data
}

async function logout() {
  const response = await instance.post('auth/logout')
  if (response.status === 201) {
    localStorage.removeItem('user')
    window.location.reload()
  }
}

async function getUser(id: Readonly<Params<string>>) {
  try {
    const response = await instance.get(`users/${id}`)

    return response.data
  } catch (error) {
    // @ts-ignore
    console.log(error.message)
  }
}

async function getUsers() {
  try {
    const response = await instance.get('users')

    return response.data
  } catch (error) {
    // @ts-ignore
    console.log(error.message)
  }
}

const api = {
  signup,
  login,
  logout,
  getUser,
  getUsers
}

export default api
