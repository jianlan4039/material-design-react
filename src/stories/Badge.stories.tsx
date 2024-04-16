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

export const Default: Story = {
  render: (args) => {
    return (
      <Badge count={2123123} size={'large'}>
        Lorem ipsum.
      </Badge>
    )
  }
}