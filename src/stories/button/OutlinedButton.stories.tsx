import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {OutlinedButton} from "../../index";

const meta: Meta = {
  component: OutlinedButton,
  title: "Button/OutlinedButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof OutlinedButton>;

export const Primary: Story = {
  render: () => {
    return (
      <OutlinedButton>Outlined Button</OutlinedButton>
    )
  }
}

export const withIcon: Story = {
  render: ({disabled}) => {
    return (
      <OutlinedButton
        icon={<span className="material-icons">home</span>}
        disabled={disabled}
      >Outlined Button</OutlinedButton>
    )
  }
}

export const withTrailingIcon: Story = {
  render: ({disabled}) => {
    return (
      <OutlinedButton
        trailingIcon
        icon={<span className="material-icons">home</span>}
        disabled={disabled}
      >Outlined Button</OutlinedButton>
    )
  }
}