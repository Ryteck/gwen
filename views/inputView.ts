import InputInterface from '../interfaces/inputInterface'
import userController from '../controllers/userController'

const inputView = {
  async render (input: InputInterface) {
    const { id, item, origin, quantity, user, when } = input
    const { firstname, lastname } = await userController.show(user)
    return {
      id,
      item: item,
      origin,
      quantity,
      user: `${firstname} ${lastname}`,
      when
    }
  },
  async renderMany (inputs: Array<InputInterface>) {
    const renders = []
    for (let i = 0; i < inputs.length; i++) {
      renders.push(await this.render(inputs[i]))
    }
    return renders
  }
}

export default inputView
