export interface ILogin {
  email: string,
  password: string
}

export interface IUser {
  id: number,
  name: string,
  email: string,
  isAdmin: boolean,
  createdAt: Date,
  updatedAt: Date,
  token?: string,
}