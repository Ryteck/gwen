import { FC, useEffect, useState } from 'react'
import Table from '../tableComponent'
import { Column } from 'material-table'
import { toast } from 'react-toastify'

const Output: FC = () => {
  const columns: Column<object>[] = [
    {
      title: 'id', field: 'id', type: 'string', align: 'center', editable: 'never'
    },
    {
      title: 'item', field: 'item', type: 'string', align: 'center'
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

  const loadData = async () => {
    try {
      setData([])
    } catch (error) {
      toast.error(String(error))
    }
  }

  const store = async (resolve: () => void, reject: () => void, newData: any): Promise<void> => {
    try {
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
    title='Output'
    columns={columns}
    data={getData}
    store={store}
    update={update}
    destroy={destroy}
  />
}

export default Output
