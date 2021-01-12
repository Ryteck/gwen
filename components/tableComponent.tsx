import { FC } from 'react'
import MaterialTable from 'material-table'

interface TableProps {
    title: string;
    columns: object[];
    data: object[];
    store: (resolve: () => void, reject: () => void, newData: any) => Promise<void>;
    update: (resolve: () => void, reject: () => void, newData: any, oldData: any) => Promise<void>;
    destroy: (resolve: () => void, reject: () => void, oldData: any) => Promise<void>;
}

const Table: FC<TableProps> = props => {
  const { title, columns, data, store, update, destroy } = props

  return (
      <>
        <MaterialTable
            title={title}
            columns={columns}
            data={data}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) =>
                  setTimeout(() =>
                    store(resolve as () =>
                    void, reject, newData), 1000)),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) =>
                  setTimeout(() =>
                    update(resolve as () =>
                    void, reject, newData, oldData), 1000)),
              onRowDelete: oldData =>
                new Promise((resolve, reject) =>
                  setTimeout(() =>
                    destroy(resolve as () =>
                      void, reject, oldData), 1000))
            }}
            options={{
              exportButton: true,
              exportAllData: true,
              sorting: true
            }}
            localization={{
              body: {
                emptyDataSourceMessage: 'Nenhum registro para exibir',
                addTooltip: 'Adcionar',
                editTooltip: 'Editar',
                deleteTooltip: 'Deletar',
                editRow: {
                  deleteText: 'Você tem certeza de que quer apagar esta linha ?',
                  saveTooltip: 'Salvar',
                  cancelTooltip: 'Cancelar'
                }
              },
              header: {
                actions: 'Ações'
              },
              pagination: {
                labelRowsSelect: 'Linhas',
                labelDisplayedRows: '{count} de {from}-{to}',
                firstTooltip: 'Primeira página',
                previousTooltip: 'Página anterior',
                nextTooltip: 'Próxima página',
                lastTooltip: 'Última página'
              },
              toolbar: {
                searchPlaceholder: 'Pesquisar',
                searchTooltip: 'Pesquisar',
                exportTitle: 'Exportar',
                exportCSVName: 'Exportar como CSV',
                exportPDFName: 'Exportar como PDF'
              }
            }}
        />
      </>
  )
}

export default Table
