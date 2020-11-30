import userController from '../controllers/userController'
import ItemInterface from '../interfaces/itemInterface'

const itemView = {
  async render (item: ItemInterface) {
    const { id, name, user, moment } = item
    const { firstname, lastname } = await userController.show(user)
    return {
      id,
      name,
      user: `${firstname} ${lastname}`,
      moment
    }
  },
  async renderMany (users: Array<ItemInterface>) {
    return users.map(async user => await this.render(user))
  }
}

export default itemView
