import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import FilledTonalButton from "../components/Button/FilledTonalButton";

const meta: Meta<typeof FilledTonalButton> = {
  component: FilledTonalButton,
  title: 'Button/FilledTonalButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledTonalButton>;

export const Primary: Story = {

  render: () => {

    return <FilledTonalButton>FilledTonal</FilledTonalButton>
  }
}