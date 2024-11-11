import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {FilledButton} from "../index";

const meta: Meta = {
  component: FilledButton,
  title: "Button/FilledButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof FilledButton>;

export const Primary: Story = {
  render: () => {
    return (
      <FilledButton>Filled Button</FilledButton>
    )
  }
}