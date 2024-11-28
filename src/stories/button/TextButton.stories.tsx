import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {TextButton} from "../../index";

const meta: Meta = {
  component: TextButton,
  title: "Button/TextButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {
  render: ({disabled}) => {
    return (
      <TextButton disabled={disabled}>Text Button</TextButton>
    )
  }
}

export const withIcon: Story = {
  render: ({disabled}) => {
    return (
      <TextButton
        disabled={disabled}
        icon={<span className="material-icons">home</span>}
      >Text Button</TextButton>
    )
  }
}

export const withTrailingIcon: Story = {
  render: ({disabled}) => {
    return (
      <TextButton
        disabled={disabled}
        trailingIcon={true}
        icon={<span className="material-icons">home</span>}
      >Text Button</TextButton>
    )
  }
}