import UserInterface from '../interfaces/userInterface'

class UserModel implements UserInterface {
    id: string | number
    username: string
    firstname: string
    lastname: string
    password: string
    avatar: string
    administrador: 'true' | 'false'

    constructor (
      id: string | number,
      username: string,
      firstname: string,
      lastname: string,
      password: string,
      avatar: string,
      administrador: 'true' | 'false'
    ) {
      this.id = id
      this.username = username
      this.firstname = firstname
      this.lastname = lastname
      this.password = password
      this.avatar = avatar
      this.administrador = administrador
    }
}

export default UserModel
