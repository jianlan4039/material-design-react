import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Table from "../components/Table/Table";

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Form/Table',
  parameters: {
    //layout: 'centered'
  }
}

export default meta;
type Story = StoryObj<typeof Table>;

interface IEmployee {
  key: string;
  name: string;
  department: string;
  year: number;
  location: string;
  locationRowSpan?: number;
}

interface IColumn {
  key: string;
  title: string;
  dataIndex: keyof IEmployee | 'extra'; // 包括额外的'extra'字段用于特殊用途
  render?: (text: any, record: IEmployee, index: number) => React.ReactNode;
  colSpan?: number | ((record: IEmployee) => number);
  rowSpan?: number | ((record: IEmployee) => number);
  sorter?: (a: IEmployee, b: IEmployee) => number;
  filters?: { text: string; value: string }[];
}


export const Default: Story = {
  render: (args) => {

    const dataSource: IEmployee[] = [
      {key: '1', name: 'John Doe', department: 'Finance', year: 2018, location: 'New York'},
      {key: '2', name: 'Jane Smith', department: 'IT', year: 2016, location: 'San Francisco', locationRowSpan: 2},
      {key: '3', name: 'Alice Johnson', department: 'IT', year: 2019, location: 'San Francisco'},
      {key: '4', name: 'Mike Brown', department: 'HR', year: 2017, location: 'Chicago'}
    ];

    const columns: IColumn[] = [
      {key: 'name', title: 'Name', dataIndex: 'name'},
      {
        key: 'department',
        title: 'Department',
        dataIndex: 'department',
        filters: [
          {text: 'All', value: ''},
          {text: 'Finance', value: 'Finance'},
          {text: 'IT', value: 'IT'},
          {text: 'HR', value: 'HR'}
        ]
      },
      {key: 'year', title: 'Year Joined', dataIndex: 'year', sorter: (a, b) => a.year - b.year},
      {
        key: 'location',
        title: 'Location',
        dataIndex: 'location',
        colSpan: (record) => record.location === 'San Francisco' ? 2 : 1,
        rowSpan: (record) => record.locationRowSpan || 1
      },
      {key: 'extra', title: '', dataIndex: 'extra', colSpan: (record) => record.location === 'San Francisco' ? 0 : 1}
    ];

    return (
      <div>
        <div>
          <h1>Employee Table</h1>
          <Table columns={columns} dataSource={dataSource}/>
        </div>
      </div>
    );
  }
}