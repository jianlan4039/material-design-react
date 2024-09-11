import React from "react";
import './index.scss';
import TableHeader, {TableHeaderAttributes} from "./internal/TableHeader";
import TableRow, {TableRowAttributes} from "./internal/TableRow";
import {BaseElement} from "../internal/common/BaseElement";

export interface TableProps extends BaseElement {
  children?: React.ReactNode;
  header?: TableHeaderAttributes
  col?: React.ReactNode
  dataSource?: TableRowAttributes[]
  caption?: string
}

export default function (
  {
    children,
    col,
    header,
    dataSource,
    className = '',
    caption,
  }: TableProps
) {

  return (
      <table className={`nd-table ${className}`}>
        <colgroup>
          {col}
        </colgroup>
        {caption && <caption className={'nd-table__caption'}>{caption}</caption>}
        <tbody>
        <TableHeader {...header}></TableHeader>
        {
          dataSource?.map((row, index) => (
            <TableRow key={`${index}`} {...row}></TableRow>
          ))
        }
        {children}
        </tbody>
      </table>
  )
};
