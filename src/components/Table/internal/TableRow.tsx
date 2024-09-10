import React from "react";
import TableCell, { TableCellAttributes } from "./TableCell";
import {BaseElement} from "../../internal/common/BaseElement";

export interface TableRowAttributes extends BaseElement {
  children?: React.ReactNode;
  cells?: TableCellAttributes[];
}

const TableRow: React.FC<TableRowAttributes> = ({
  children,
  cells,
  className = "",
    ...rest
  }) => {

  return (
    <tr className={`nd-table__row ${className}`}  {...rest}>
      {
        children ||
        cells?.map((cell, index) => <TableCell key={`${cell.field}-${index}`} {...cell}></TableCell>)
      }
    </tr>
  );
};

export default TableRow;
