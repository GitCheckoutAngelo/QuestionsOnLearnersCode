import { createContext } from 'react'
import { User } from '../models/User'

interface UserContextType {
  user: User | null
}

const defaultUserContext = {
  user: null,
}

export const UserContext = createContext<UserContextType>(defaultUserContext)
