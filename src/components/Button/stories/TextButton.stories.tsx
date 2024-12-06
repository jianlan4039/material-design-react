import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {TextButton} from "../../../index";

export default {
  component: TextButton,
  title: "Common Buttons/TextButton",
  tags: ['autodocs'],
  args: {
    label: "Text Button"
  },
  parameters: {
    layout: "centered",
  }
} as Meta


type Story = StoryObj<typeof TextButton>;

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>,
    label: "Text Button",
  }
}