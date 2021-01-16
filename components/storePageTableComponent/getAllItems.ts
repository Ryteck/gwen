import api from '../../libs/api'

const getAllItems = async (): Promise<object> => {
  const dinamic: any = {}

  const items = await api
    .get<{items: {id: string, name: string}[]}>('tables/current')
    .then(({ data }) => data.items)
    .catch(error => { throw error })

  items.forEach(item => {
    const { id, name } = item
    dinamic[id] = `${id} - ${name}`
  })

  return dinamic
}

export default getAllItems
