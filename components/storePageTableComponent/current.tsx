import { FC, useEffect, useState } from 'react'
import Table from '../tableComponent'
import { Column } from 'material-table'
import { toast } from 'react-toastify'
import api from '../../libs/api'

const Current: FC = () => {
  const columns: Column<object>[] = [
    {
      title: 'id', field: 'id', type: 'string', align: 'center', editable: 'never'
    },
    {
      title: 'nome', field: 'name', type: 'string', align: 'center'
    },
    {
      title: 'usuário', field: 'user', type: 'string', align: 'center', editable: 'never'
    },
    {
      title: 'quantidade', field: 'quantity', type: 'numeric', align: 'center', editable: 'never'
    },
    {
      title: 'criação', field: 'when', type: 'datetime', align: 'center', editable: 'never', defaultSort: 'desc'
    }
  ]

  const [getData, setData] = useState<object[]>([])

  const loadData = async () => {
    try {
      const items = await api
        .get('tables/current')
        .then(({ data }) => data.items)
        .catch(error => { throw error })
      setData(items.map(item => {
        return {
          ...item,
          when: new Date(item.when)
        }
      }))
    } catch (error) {
      toast.error(String(error))
    }
  }

  const store = async (resolve: () => void, reject: () => void, newData: any): Promise<void> => {
    try {
      console.log(newData)
      await api
        .post('items/rest/store', {
          name: newData.name,
          user: sessionStorage.getItem('id')
        })
      loadData()
      resolve()
    } catch (error) {
      toast.error(String(error))
      reject()
    }
  }

  const update = async (resolve: () => void, reject: () => void, newData: any, oldData: any): Promise<void> => {
    try {
      loadData()
      resolve()
    } catch (error) {
      toast.error(String(error))
      reject()
    }
  }

  const destroy = async (resolve: () => void, reject: () => void, oldData: any): Promise<void> => {
    try {
      loadData()
      resolve()
    } catch (error) {
      toast.error(String(error))
      reject()
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return <Table
    title='Current'
    columns={columns}
    data={getData}
    store={store}
    update={update}
    destroy={destroy}
  />
}

export default Current
