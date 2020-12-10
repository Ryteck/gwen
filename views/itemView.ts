import userController from '../controllers/userController'
import ItemInterface from '../interfaces/itemInterface'

const itemView = {
  async render (item: ItemInterface) {
    const { id, name, user, when } = item
    const { firstname, lastname } = await userController.show(user)
    return {
      id,
      name,
      user: `${firstname} ${lastname}`,
      when
    }
  },
  async renderMany (items: Array<ItemInterface>) {
    const renders = []
    for (let i = 0; i < items.length; i++) {
      renders.push(await this.render(items[i]))
    }
    return renders
  }
}

export default itemView
