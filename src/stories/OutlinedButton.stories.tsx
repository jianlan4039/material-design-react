import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import OutlinedButton from "../components/Button/OutlinedButton";

const meta: Meta<typeof OutlinedButton> = {
  component: OutlinedButton,
  title: 'Button/OutlinedButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedButton>;

export const Primary: Story = {

  render: (args) => {

    return <OutlinedButton {...args}>Outlined</OutlinedButton>
  }
}