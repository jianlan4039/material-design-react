import {Meta, StoryObj} from "@storybook/react";
import Table from "../components/Table";
import TableHeader from "../components/Table/internal/TableHeader";
import TableCell from "../components/Table/internal/TableCell";
import TableRow from "../components/Table/internal/TableRow";

const meta: Meta = {
  title: "Table",
  component: Table,
  tags: ["autodocs"]
}

export default meta;
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    header: {
      cells: [
        {
          field: 'id',
          label: '编号',
          header: true
        },
        {
          field: 'Product',
          label: '产品',
          header: true
        },
        {
          field: 'Supplier',
          label: '供货商',
          header: true
        },
        {
          field: 'Stock',
          label: '库存',
          header: true
        }
      ]
    },
    dataSource: [
      {
        cells: [
          {
            field: 'id',
            value: "001"
          },
          {
            field: 'Product',
            value: 'Tea',
          },
          {
            field: 'Suppliers',
            value: 'Company A'
          },
          {
            field: 'Stock',
            value: '500'
          }
        ]
      },
      {
        cells: [
          {
            field: 'id',
            value: "002"
          },
          {
            field: 'Product',
            value: 'Juice'
          },
          {
            field: 'Suppliers',
            value: 'Company B'
          },
          {
            field: 'Stock',
            value: '1000'
          }
        ]
      },
      {
        cells: [
          {
            field: 'id',
            value: "003"
          },
          {
            field: 'Product',
            value: 'Rice'
          },
          {
            field: 'Suppliers',
            value: 'Company C'
          },
          {
            field: 'Stock',
            value: '1200'
          }
        ]
      }
    ]
  }
}

export const Secondary: Story = {
  render: () => {
    return (
      <Table>
        <caption>Lorem ipsum dolor sit amet.</caption>
        <TableHeader>
          <TableCell field={"id"} label={"编号"} header></TableCell>
          <TableCell field={"product"} label={"产品"} header></TableCell>
          <TableCell field={"supplier"} label={"供应商"} header></TableCell>
          <TableCell field={"stock"} label={"库存"} header></TableCell>
        </TableHeader>
        <TableRow>
          <TableCell field={'id'} value={'001'}></TableCell>
          <TableCell field={'product'} value={'Tea'}></TableCell>
          <TableCell field={'supplier'} value={'Company A'}></TableCell>
          <TableCell field={'stock'} value={100}></TableCell>
        </TableRow>
        <TableRow>
          <TableCell field={'id'} value={'002'}></TableCell>
          <TableCell field={'product'} value={'Juice'}></TableCell>
          <TableCell field={'supplier'} value={'Company B'}></TableCell>
          <TableCell field={'stock'} value={1000}></TableCell>
        </TableRow>
      </Table>
    )
  }
}