import { FC, useState } from 'react'
import Table from '../tableComponent'
import { Column } from 'material-table'

const Current: FC = () => {
  const columns: Column<object>[] = [
    {
      title: 'id', field: 'id', type: 'string', align: 'center'
    },
    {
      title: 'nome', field: 'name', type: 'string', align: 'center'
    },
    {
      title: 'usuário', field: 'user', type: 'string', align: 'center'
    },
    {
      title: 'quantidade', field: 'quantity', type: 'numeric', align: 'center'
    },
    {
      title: 'criação', field: 'when', type: 'datetime', align: 'center'
    }
  ]

  const [getData, setData] = useState<object[]>([])

  const store = async (resolve: () => void, reject: () => void, newData: any): Promise<void> => {
    setData([...getData, newData])
    resolve()
  }

  const update = async (resolve: () => void, reject: () => void, newData: any, oldData: any): Promise<void> => {
    resolve()
  }

  const destroy = async (resolve: () => void, reject: () => void, oldData: any): Promise<void> => {
    resolve()
  }

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
