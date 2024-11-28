import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {ElevatedButton} from "../../index";

const meta: Meta = {
  component: ElevatedButton,
  title: "Button/ElevatedButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof ElevatedButton>;

export const Primary: Story = {
  render: () => {
    return (
      <ElevatedButton>Elevated Button</ElevatedButton>
    )
  }
}

export const withLeadingIcon: Story = {
  render: ({disabled}) => {
    return (
      <ElevatedButton
        icon={<span className="material-icons">home</span>}
        disabled={disabled}
      >
        Elevated Button
      </ElevatedButton>
    )
  }
}

export const withTrailingIcon: Story = {
  render: ({disabled}) => {
    return (
      <ElevatedButton
        trailingIcon={true}
        icon={<span className="material-icons">home</span>}
        disabled={disabled}
      >
        Elevated Button
      </ElevatedButton>
    )
  }
}