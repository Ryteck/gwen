import UserModel from '../models/userModel'

const userView = {
  render (user: UserModel) {
    const { username, firstname, lastname, avatar } = user
    return {
      username,
      firstname,
      lastname,
      avatar
    }
  },
  renderMany (users: Array<UserModel>) {
    return users.map(user => this.render(user))
  }
}

export default userView
