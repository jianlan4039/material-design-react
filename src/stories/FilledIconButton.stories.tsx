import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import FilledIconButton from "../components/IconButton/FilledIconButton";
import {FilledIcon} from "../icons";

const meta: Meta<typeof FilledIconButton> = {
  component: FilledIconButton,
  title: 'IconButton/FilledIconButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledIconButton>;

export const Default: Story = {
  render: (args) => {

    return (
      <FilledIconButton {...args}>
        <FilledIcon>home</FilledIcon>
      </FilledIconButton>
    )
  }
}