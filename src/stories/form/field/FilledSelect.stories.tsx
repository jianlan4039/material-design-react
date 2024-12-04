import {Meta, StoryObj} from "@storybook/react";
import {FilledSelect} from "../../../index";

const meta: Meta = {
  title: "Form/Filled Select",
  component: FilledSelect,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledSelect>;

const selectOptions = [
  {
    headline: 'Apple',
    value: 1,
    id: 'apple'
  },
  {
    headline: 'Orange',
    value: 2,
    id: 'orange'
  },
  {
    headline: "Banana",
    value: 3,
    id: 'banana'
  }
]

export const Primary: Story = {
  render: ({multiple, }) => (
    <div style={{width: "200px"}}>
      <FilledSelect label={"fruit"} items={selectOptions} multiple={multiple}></FilledSelect>
    </div>
  )
}