import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import OutlinedTextField from "../components/TextField/OutlinedTextField";
import {FilledIcon} from "../icons";

const meta: Meta<typeof OutlinedTextField> = {
  component: OutlinedTextField,
  title: 'Form/OutlinedTextField',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedTextField>;

export const Default: Story = {
  render: (args) => {
    return (
      <OutlinedTextField
        leadingIcon={<FilledIcon>home</FilledIcon>}
        trailingIcon={<FilledIcon>check</FilledIcon>}
        label={'Label'}
        {...args}></OutlinedTextField>
    )
  }
}