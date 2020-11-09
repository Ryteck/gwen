import UserInterface from '../interfaces/userInterface'

class UserModel implements UserInterface {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    avatar: string;

    constructor (
      username: string,
      firstname: string,
      lastname: string,
      password: string,
      avatar: string
    ) {
      this.username = username
      this.firstname = firstname
      this.lastname = lastname
      this.password = password
      this.avatar = avatar
    }
}

export default UserModel
