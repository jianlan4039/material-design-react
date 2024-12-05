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
  args: {
    icon: <span className={'material-icons'}>home</span>,
    label: "Filled Tonal Button",
  }
}