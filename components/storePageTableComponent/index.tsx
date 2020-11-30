import { FC } from 'react'
import Current from './current'
import Input from './input'
import Output from './output'
import Tools from './tools'

interface StorePageTableProps {
    table: 'current' | 'input' | 'output' | 'tools';
}

const StorePageTable: FC<StorePageTableProps> = props => {
  const { table } = props

  switch (table) {
    case 'current':
      return <Current/>
    case 'input':
      return <Input/>
    case 'output':
      return <Output/>
    case 'tools':
      return <Tools/>
  }
}

export default StorePageTable
