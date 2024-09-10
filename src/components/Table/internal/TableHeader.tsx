import React from "react";
import {BaseElement} from "../../internal/common/BaseElement";
import TableCell, {TableCellAttributes} from "./TableCell";

export interface TableHeaderAttributes extends BaseElement {
  children?: React.ReactNode;
  sticky?: boolean;
  cells?: TableCellAttributes[];
}

const TableHeader: React.FC<TableHeaderAttributes> = ({
    children,
    cells,
    sticky = false,
    className= "",
    ...rest
  }) => {

  const renderCells = () =>
    cells?.map((cell, index) => (
      <TableCell key={`${cell.field}-${index}`} {...cell} />
    ));

  return (
    <>
      <tr className={`nd-table__header ${className} ${sticky ? 'sticky-header' : ''}`} {...rest}>
      {children || renderCells()}
      </tr>
    </>
  );
};

export default TableHeader;
