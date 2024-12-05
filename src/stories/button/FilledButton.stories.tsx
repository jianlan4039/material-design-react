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
  args: {
    icon: <span className={'material-icons'}>home</span>,
    label: "Filled Button",
  }
}