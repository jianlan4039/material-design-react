import {Meta, StoryObj} from "@storybook/react";
import Pagination from "../components/Pagination";
import {useState} from "react";

const meta: Meta = {
  title: "Pagination",
  component: Pagination,
  args: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  render: () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 95; // 示例数据总数

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    // 示例数据，假设每页显示 itemsPerPage 条数据
    const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div>
        <h1>Pagination Example with Ellipsis</h1>
        <ul>
          {paginatedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );

  }
}