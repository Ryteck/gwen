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
    const renders = []
    for (let i = 0; i < users.length; i++) {
      renders.push(this.render(users[i]))
    }
    return renders
  }
}

export default userView
