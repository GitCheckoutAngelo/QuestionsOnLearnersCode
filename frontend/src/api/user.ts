import axios from 'axios'
import { SERVER } from '../utils/config/server'
import { User } from '../models/User'

export const getUser = async (uid: string): Promise<User> => {
  return axios.get(`${SERVER.USER_ENDPOINT}${uid}`).then((res) => {
    return res.data
  })
}

export const createUser = async (
  uid: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<void> => {
  await axios
    .post(SERVER.USER_ENDPOINT.slice(0, -1), {
      uid: uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}
