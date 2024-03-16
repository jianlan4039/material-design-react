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
        label={'Label'}
        {...args}></OutlinedTextField>
    )
  }
}

export const LeadingIcon: Story = {
  render: (args) => {
    return (
      <OutlinedTextField
        leadingIcon={<FilledIcon>home</FilledIcon>}
        label={'Label'}
        {...args}></OutlinedTextField>
    )
  }
}

export const TrailingIcon: Story = {
  render: (args) => {
    return (
      <OutlinedTextField
        label={'Label'}
        {...args}></OutlinedTextField>
    )
  }
}

export const LeadingAndTrailing: Story = {
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

export const PrefixAndSuffix: Story = {
  render: (args) => {
    return (
      <OutlinedTextField
        prefix={'$'}
        suffix={'.00 '}
        label={'Label'}
        {...args}></OutlinedTextField>
    )
  }
}