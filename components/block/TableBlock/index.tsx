import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { TableBlockRecord } from '@/components/block/types'

const TableBlock: React.FC<{
  record: TableBlockRecord
}> = props => {
  const { record } = props

  if (!record.content) return null

  const dataSource = record.content

  const columnHelper = createColumnHelper<any>()

  const columns = dataSource.columns.map((columnName: string) =>
    columnHelper.accessor(columnName, {
      cell: info => info.getValue(),
    })
  )

  const table = useReactTable({
    data: dataSource.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table>
        {/* 表头 */}
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* 表格主体 */}
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getAllCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableBlock
