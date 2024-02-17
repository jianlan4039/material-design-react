import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import FilledButton from "../components/Button/FilledButton";

const meta: Meta<typeof FilledButton> = {
  component: FilledButton,
  title: 'Button/FilledButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledButton>;

export const Primary: Story = {

  render: () => {

    return <FilledButton disabled>Filled</FilledButton>
  }
}