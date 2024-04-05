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
      {label: 'Item One', value: 'Apple'},
      {label: 'Item Two', value: 'Item Two'},
      {label: 'Item Three', value: '3'},
    ]
    return (
      <OutlinedSelect label={'label'} items={options}></OutlinedSelect>
    )
  }
}