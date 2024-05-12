import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Badge from "../components/Badge/Badge";
import {FilledIcon} from "../icons";

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Container/Badge',
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Badge>;

export const Large: Story = {
  render: (args) => {
    return (
      <Badge count={0} size={'large'} {...args}>
        <FilledIcon>home</FilledIcon>
      </Badge>
    )
  }
}

export const LargeWithText: Story = {
  render: (args) => {
    return (
      <Badge count={2123123} size={'large'} {...args}>
        Lorem ipsum dolor sit amet.
      </Badge>
    )
  }
}

export const Small: Story = {
  render: (args) => {
    return (
      <Badge size={'small'} {...args}>
        Lorem ipsum.
      </Badge>
    )
  }
}