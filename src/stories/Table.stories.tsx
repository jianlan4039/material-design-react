import {Meta, StoryObj} from "@storybook/react";
import Table from "../components/Table";
import TableHeader from "../components/Table/internal/TableHeader";
import TableCell from "../components/Table/internal/TableCell";
import TableRow from "../components/Table/internal/TableRow";
import ElevatedCard from "../components/Card/ElevatedCard";
import Pagination from "../components/Pagination";
import {useState} from "react";

const meta: Meta = {
  title: "Table",
  component: Table,
  tags: ["autodocs"]
}

export default meta;
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    // caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, sint.',
    header: {
      cells: [
        {
          field: 'id',
          label: 'ID',
          header: true
        },
        {
          field: 'Product',
          label: 'PRODUCT',
          header: true
        },
        {
          field: 'Supplier',
          label: 'SUPPLIER',
          header: true
        },
        {
          field: 'quantity',
          label: 'QUANTITY',
          header: true
        },
        {
          field: 'type',
          label: 'TYPE',
          header: true
        },
        {
          field: 'state',
          label: 'STATE',
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
            field: 'product',
            value: 'Tea',
          },
          {
            field: 'supplier',
            value: 'Company A'
          },
          {
            field: 'quantity',
            value: '500'
          },
          {
            field: 'type',
            value: 'Food'
          },
          {
            field: 'state',
            value: 'available'
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
            field: 'product',
            value: 'Tea',
          },
          {
            field: 'supplier',
            value: 'Company A'
          },
          {
            field: 'quantity',
            value: '500'
          },
          {
            field: 'type',
            value: 'Food'
          },
          {
            field: 'state',
            value: 'available'
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
            field: 'product',
            value: 'Tea',
          },
          {
            field: 'supplier',
            value: 'Company A'
          },
          {
            field: 'quantity',
            value: '500'
          },
          {
            field: 'type',
            value: 'Food'
          },
          {
            field: 'state',
            value: 'available'
          }
        ]
      },
    ]
  }
}

export const Secondary: Story = {
  render: () => {

    const [currentPage, setCurrentPage] = useState<number>(1)

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <ElevatedCard interactive={false}>
        <Table>
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
        <Pagination totalItems={20} itemsPerPage={10} currentPage={currentPage} onPageChange={handlePageChange} />
      </ElevatedCard>

    )
  }
}