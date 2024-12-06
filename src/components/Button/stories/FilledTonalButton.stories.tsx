import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {FilledTonalButton} from "../../../index";

export default {
  component: FilledTonalButton,
  title: "Common Buttons/Filled Tonal Button",
  tags: ['autodocs'],
  args: {
    label: "Filled Tonal Button",
  },
  parameters: {
    layout: "centered",
  },
} as Meta

type Story = StoryObj<typeof FilledTonalButton>;

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>,
  }
}