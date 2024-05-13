import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import ElevatedCard from "../components/Card/ElevatedCard";
import FilledCard from "../components/Card/FilledCard";
import OutlineCard from "../components/Card/OutlineCard";

const meta: Meta<typeof ElevatedCard> = {
  component: ElevatedCard,
  title: 'Container/Card',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof ElevatedCard>;

export const Elevated: Story = {
  render: (args) => {
    return (
      <ElevatedCard
        style={{
          width: '500px',
          height: '500px'
        }}
        {...args}
      >
      </ElevatedCard>
    )
  }
}

export const Filled: Story = {
  render: (args) => {
    return (
      <FilledCard
        style={{
          width: '500px',
          height: '500px'
        }}
        {...args}
      >
      </FilledCard>
    )
  }
}

export const Outline: Story = {
  render: (args) => {
    return (
      <OutlineCard
        style={{
          width: '500px',
          height: '500px'
        }}
        {...args}
      >
      </OutlineCard>
    )
  }
}