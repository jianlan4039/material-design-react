import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import DatePicker from "../components/DatePicker/DatePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Form/DatePicker',
  parameters: {
    //layout: 'centered'
  }
}

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {

    return (
      <DatePicker {...args}></DatePicker>
    )
  }
}