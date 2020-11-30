import { NextApiHandler } from 'next'
import itemController from '../../../../../controllers/itemController'
import * as Yup from 'yup'
import itemView from '../../../../../views/itemView'

const validate = async (name: string): Promise<void> => {
  const data = { name }

  const schema = Yup.object().shape({
    name: Yup.string().required()
  })

  await schema.validate(data, { abortEarly: false })
}

const handle: NextApiHandler = async (req, res) => {
  try {
    const id = String(req.query.id)
    const { name } = req.body

    await validate(name)

    const originalItem = await itemController.show(id)

    const tempNewItem = { ...originalItem, name: name }

    await itemController.update(
      id,
      tempNewItem.name,
      tempNewItem.user,
      tempNewItem.moment
    )

    const newItem = await itemController.show(id)
    res.status(200).json({ item: itemView.render(newItem) })
  } catch (error) {
    res.status(200).json({ error: String(error) })
  }
}

export default handle
