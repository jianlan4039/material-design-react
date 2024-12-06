import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {OutlinedButton} from "../../../index";

export default {
  component: OutlinedButton,
  title: "Common Buttons/Outlined Button",
  tags: ['autodocs'],
  args: {
    label: "Outlined Button"
  },
  parameters: {
    layout: "centered",
  }
} as Meta;

type Story = StoryObj<typeof OutlinedButton>;

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>,
  }
}