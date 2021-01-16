import OutputInterface from '../interfaces/outputInterface'
import userController from '../controllers/userController'

const outputView = {
  async render (output: OutputInterface) {
    const { id, item, destiny, quantity, user, when } = output
    const { firstname, lastname } = await userController.show(user)
    return {
      id,
      item: item,
      destiny,
      quantity,
      user: `${firstname} ${lastname}`,
      when
    }
  },
  async renderMany (outputs: Array<OutputInterface>) {
    const renders = []
    for (let i = 0; i < outputs.length; i++) {
      renders.push(await this.render(outputs[i]))
    }
    return renders
  }
}

export default outputView
