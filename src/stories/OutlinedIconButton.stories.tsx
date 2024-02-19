import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FilledIcon} from "../icons";
import OutlinedIconButton from "../components/IconButton/OutlinedIconButton";

const meta: Meta<typeof OutlinedIconButton> = {
  component: OutlinedIconButton,
  title: 'IconButton/OutlinedIconButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedIconButton>;

export const Default: Story = {
  render: (args) => {

    return (
      <OutlinedIconButton {...args}>
        <FilledIcon>home</FilledIcon>
      </OutlinedIconButton>
    )
  }
}