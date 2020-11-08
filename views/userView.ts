import UserEntity from '../entities/userEntity'

const userView = {
  render (user: UserEntity) {
    const { username, firstname, lastname, avatar } = user
    return {
      username,
      firstname,
      lastname,
      avatar
    }
  },
  renderMany (users: Array<UserEntity>) {
    return users.map(user => this.render(user))
  }
}

export default userView
