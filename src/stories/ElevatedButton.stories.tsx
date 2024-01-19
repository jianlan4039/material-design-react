import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import ElevatedButton from "../components/Button/ElevatedButton";

const meta: Meta<typeof ElevatedButton> = {
  component: ElevatedButton,
  title: 'Button/ElevatedButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof ElevatedButton>;

export const Primary: Story = {
  render: () => <ElevatedButton></ElevatedButton>
}