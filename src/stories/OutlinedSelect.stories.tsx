import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import OutlinedSelect from "../components/Select/OutlinedSelect";

const meta: Meta<typeof OutlinedSelect> = {
  component: OutlinedSelect,
  title: 'Form/OutlinedSelect',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedSelect>;

export const Default: Story = {
  render: (args) => {
    const options = [
      {label: 'Item One'},
      {label: 'Item Two'},
      {label: 'Item Three'},
    ]
    return (
      <OutlinedSelect label={'label'} options={options}></OutlinedSelect>
    )
  }
}