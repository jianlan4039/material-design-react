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
  render: ({size = 'large', count = 9, ...rest}) => {
    return (
      <Badge size={size} count={count} {...rest}>
        <FilledIcon>home</FilledIcon>
      </Badge>
    )
  }
}

export const Small: Story = {
  render: ({size = 'small', ...rest}) => {
    return (
      <Badge size={size} count={5} {...rest}>
        Lorem ipsum.
      </Badge>
    )
  }
}