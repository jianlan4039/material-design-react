import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FilledIcon} from "../icons";
import IconButton from "../components/IconButton/IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'IconButton/IconButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => {

    return (
      <IconButton {...args}>
        <FilledIcon>home</FilledIcon>
      </IconButton>
    )
  }
}