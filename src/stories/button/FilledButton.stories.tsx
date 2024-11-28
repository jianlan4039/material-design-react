import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {FilledButton} from "../../index";

const meta: Meta = {
  component: FilledButton,
  title: "Button/FilledButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof FilledButton>;

export const Primary: Story = {
  render: ({disabled}) => {
    return (
      <FilledButton
        disabled={disabled}
      >Filled Button</FilledButton>
    )
  }
}

export const withIcon: Story = {
  render: ({disabled}) => {
    return (
      <FilledButton
        disabled={disabled}
        icon={<span className="material-icons">home</span>}
      >Filled Button</FilledButton>
    )
  }
}

export const withTrailingIcon: Story = {
  render: ({disabled}) => {
    return (
      <FilledButton
        disabled={disabled}
        trailingIcon
        icon={<span className="material-icons">home</span>}
      >Filled Button</FilledButton>
    )
  }
}