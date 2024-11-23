import {Meta, StoryObj} from "@storybook/react";
import {OutlinedSelect} from "../../../index";

const meta: Meta = {
  title: "Form/Outlined Select",
  component: OutlinedSelect,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedSelect>;

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
  render: () => (
    <div style={{width: "200px"}}>
      <OutlinedSelect label={"fruit"} items={selectOptions}></OutlinedSelect>
    </div>
  )
}