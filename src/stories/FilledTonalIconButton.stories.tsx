import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FilledIcon} from "../icons";
import FilledTonalIconButton from "../components/IconButton/FilledTonalIconButton";

const meta: Meta<typeof FilledTonalIconButton> = {
  component: FilledTonalIconButton,
  title: 'IconButton/FilledTonalIconButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledTonalIconButton>;

export const Default: Story = {
  render: (args) => {

    return (
      <FilledTonalIconButton {...args}>
        <FilledIcon>home</FilledIcon>
      </FilledTonalIconButton>
    )
  }
}