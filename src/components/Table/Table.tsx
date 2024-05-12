import React, { useState, useEffect } from 'react';
import './Table.scss'

type Column = {
  key: string;
  title: string;
  dataIndex: string;
  render?: (text: any, record: any, index: number) => React.ReactNode;
  colSpan?: number | ((record: any) => number);
  rowSpan?: number | ((record: any) => number);
  sorter?: (a: any, b: any) => number;
  filters?: { text: string; value: any }[];
};


type TableProps = {
  columns: Column[];
  dataSource: any[];
};

const Table: React.FC<TableProps> = ({ columns, dataSource }) => {
  const [sortedData, setSortedData] = useState(dataSource);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('ascend');
  const [filterData, setFilterData] = useState(dataSource);

  useEffect(() => {
    setSortedData(applySort(filterData));
  }, [filterData, sortColumn, sortOrder]);

  const applySort = (data: any[]) => {
    if (!sortColumn || !sortOrder) return data;
    const column = columns.find(col => col.key === sortColumn);
    if (!column || !column.sorter) return data;
    const sorted = [...data].sort(column.sorter);
    if (sortOrder === 'descend') sorted.reverse();
    return sorted;
  };

  const handleSort = (column: Column) => {
    if (!column.sorter) return;
    const newOrder = sortColumn === column.key && sortOrder === 'ascend' ? 'descend' : 'ascend';
    setSortColumn(column.key);
    setSortOrder(newOrder);
  };

  const handleFilter = (column: Column, filterValue: any) => {
    if (!filterValue) {
      setFilterData(dataSource);
    } else {
      const filtered = dataSource.filter(item => item[column.dataIndex] === filterValue);
      setFilterData(filtered);
    }
  };

  const renderHeader = () => (
    <thead>
    <tr>
      {columns.map(column => {
        const colSpanValue = typeof column.colSpan === 'function' ? column.colSpan({}) : column.colSpan || 1;
        return (
          <th key={column.key} colSpan={colSpanValue} onClick={() => handleSort(column)}>
            {column.title}
            {sortColumn === column.key && (sortOrder === 'ascend' ? ' 🔼' : ' 🔽')}
          </th>
        );
      })}
    </tr>
    </thead>
  );


  const renderBody = () => (
    <tbody>
    {sortedData.map((record, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map(column => {
          const cellData = record[column.dataIndex];
          const colSpan = typeof column.colSpan === 'function' ? column.colSpan(record) : column.colSpan || 1;
          const rowSpan = typeof column.rowSpan === 'function' ? column.rowSpan(record) : column.rowSpan || 1;

          // 如果 colSpan 为 0，则不渲染该单元格
          if (colSpan === 0) return null;

          return (
            <td key={column.key} colSpan={colSpan} rowSpan={rowSpan}>
              {column.render ? column.render(cellData, record, rowIndex) : cellData}
            </td>
          );
        })}
      </tr>
    ))}
    </tbody>
  );



  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      {renderHeader()}
      {renderBody()}
    </table>
  );
};

export default Table;
