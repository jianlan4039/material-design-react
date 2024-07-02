import React from "react";
import {Meta, StoryObj} from '@storybook/react';
import {ElevatedButton} from "../index";
import {Button} from "./examples/Button";

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
      <div style={{background: 'aliceblue', padding: '10px', zIndex: 20}}>
        <ElevatedButton>Elevated Button</ElevatedButton>
      </div>
    )
  }
}