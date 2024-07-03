import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {ElevatedButton, ElevatedCard} from "../index";

const meta: Meta = {
  component: ElevatedButton,
  title: "Button/ElevatedButton",
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof ElevatedButton>;

export const Primary: Story = {
  render: () => {
    return (
      <ElevatedCard style={{width: '500px', height: '500px'}}>
        <ElevatedButton>Elevated Button</ElevatedButton>
      </ElevatedCard>
    )
  }
}