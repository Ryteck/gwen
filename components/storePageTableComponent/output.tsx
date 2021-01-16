import { FC, useEffect, useState } from 'react'
import Table from '../tableComponent'
import { Column } from 'material-table'
import { toast } from 'react-toastify'
import api from '../../libs/api'
import getAllItems from './getAllItems'

const Output: FC = () => {
  const [getAllItemsLookup, setAllItemsLookup] = useState<object>({})

  const columns: Column<object>[] = [
    {
      title: 'id', field: 'id', type: 'string', align: 'center', editable: 'never'
    },
    {
      title: 'item', field: 'item', type: 'string', align: 'center', lookup: getAllItemsLookup
    },
    {
      title: 'destino', field: 'destiny', type: 'string', align: 'center'
    },
    {
      title: 'quantidade', field: 'quantity', type: 'numeric', align: 'center'
    },
    {
      title: 'usuário', field: 'user', type: 'string', align: 'center', editable: 'never'
    },
    {
      title: 'data', field: 'when', type: 'datetime', align: 'center', editable: 'never', defaultSort: 'desc'
    }
  ]

  const [getData, setData] = useState<object[]>([])

  const loadItems = async () => {
    try {
      setAllItemsLookup(await getAllItems())
    } catch (error) {
      toast.error(String(error))
    }
  }

  const loadData = async () => {
    try {
      const outputs = await api
        .get('outputs/rest')
        .then(({ data }) => data.outputs)
        .catch(error => { throw error })
      setData(outputs.map(output => {
        return {
          ...output,
          when: new Date(output.when)
        }
      }))
    } catch (error) {
      toast.error(String(error))
    }
  }

  const store = async (resolve: () => void, reject: () => void, newData: any): Promise<void> => {
    try {
      const { item, destiny, quantity } = newData
      await api
        .post('outputs/rest/store', {
          item,
          destiny,
          quantity,
          user: sessionStorage.getItem('id')
        })
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => {
          throw error
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
    loadItems()
    loadData()
  }, [])

  return <Table
    title='Output'
    columns={columns}
    data={getData}
    store={store}
    update={update}
    destroy={destroy}
  />
}

export default Output
