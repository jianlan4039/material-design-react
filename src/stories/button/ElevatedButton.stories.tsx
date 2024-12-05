import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {ElevatedButton} from "../../index";

const meta: Meta = {
  component: ElevatedButton,
  title: "Button/ElevatedButton",
}

export default meta;

type Story = StoryObj<typeof ElevatedButton>;

export const Primary: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>,
    label: "Elevated Button",
  }
}