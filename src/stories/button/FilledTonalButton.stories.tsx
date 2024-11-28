import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {FilledTonalButton} from "../../index";

const meta: Meta = {
  component: FilledTonalButton,
  title: "Button/FilledTonalButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof FilledTonalButton>;

export const Primary: Story = {
  render: ({disabled}) => {
    return (
      <FilledTonalButton
        disabled={disabled}
      >Filled Tonal Button</FilledTonalButton>
    )
  }
}

export const withIcon: Story = {
  render: ({disabled}) => {
    return (
      <FilledTonalButton
        icon={<span className="material-icons">home</span>}
        disabled={disabled}
      >Filled Tonal Button</FilledTonalButton>
    )
  }
}

export const withTrailingIcon: Story = {
  render: ({disabled}) => {
    return (
      <FilledTonalButton
        trailingIcon={true}
        icon={<span className="material-icons">home</span>}
        disabled={disabled}
      >Filled Tonal Button</FilledTonalButton>
    )
  }
}