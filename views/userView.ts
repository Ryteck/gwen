import UserInterface from '../interfaces/userInterface'

const userView = {
  render (user: UserInterface) {
    const { id, username, firstname, lastname, avatar, administrador } = user
    return {
      id,
      username,
      firstname,
      lastname,
      avatar,
      administrador: administrador === 'true'
    }
  },
  renderMany (users: Array<UserInterface>) {
    return users.map(user => this.render(user))
  }
}

export default userView
