export interface User {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
  image?: {
    url: string
  }
}
