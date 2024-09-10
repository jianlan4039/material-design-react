import React from "react";
import './index.scss';
import TableHeader, {TableHeaderAttributes} from "./internal/TableHeader";
import TableRow, {TableRowAttributes} from "./internal/TableRow";
import ElevatedCard from "../Card/ElevatedCard";

export interface TableProps {
  children?: React.ReactNode;
  header?: TableHeaderAttributes
  dataSource?: TableRowAttributes[]
}

export default function (
  {
    children,
    header,
    dataSource,
  }: TableProps
) {

  return (
    <ElevatedCard className={"nd-table"} interactive={false}>
      <table className={"nd-table__table"}>
        <tbody>
        {
          children ||
          <>
            <TableHeader {...header}></TableHeader>
            {
              dataSource?.map((row, index) => (
                <TableRow key={`${index}`} {...row}></TableRow>
              ))
            }
          </>
        }
        </tbody>
      </table>
    </ElevatedCard>
  )
};
