import React from 'react';
import {BaseElement} from "../../internal/common/BaseElement";

export interface TableCellAttributes extends BaseElement {
  field: string;
  label?: string;
  value?: string | number | boolean;
  visible?: boolean;
  readonly?: boolean;
  span?: number;
  header?: boolean;
}

const TableCell: React.FC<TableCellAttributes> = ({
  label,
  field,
  value,
  visible = true,
  readonly = false,
  className="",
  span = 1,
  header = false,
  ...rest
}) => {

  if (!visible) return null;

  const content = label || value || field;
  const Tag = header ? 'th' : 'td';

  return (
    <Tag className={`nd-table__cell ${className}`} colSpan={span} {...rest}>
      {content}
    </Tag>
  );
};

export default TableCell;
