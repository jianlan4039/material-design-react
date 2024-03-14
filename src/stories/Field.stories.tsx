import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import FilledTextField from "../components/TextField/internal/FilledTextField";
import {FilledIcon} from "../icons";

const meta: Meta<typeof FilledTextField> = {
  component: FilledTextField,
  title: 'Form/FilledTextField',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledTextField>;

export const Default: Story = {
  render: (args) => {
    return (
      <FilledTextField
        leadingIcon={<FilledIcon>home</FilledIcon>}
        trailingIcon={<FilledIcon>check</FilledIcon>}
        label={'Label'}
        {...args}
      ></FilledTextField>
    )
  }
}