import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {TextButton} from "../../../index";

const meta: Meta = {
  component: TextButton,
  title: "Button/TextButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>,
    label: "Text Button",
  }
}