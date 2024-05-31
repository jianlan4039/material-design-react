import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import ElevatedButton from "../components/Button/ElevatedButton";
import {FilledIcon} from "../icons";

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

export const Default: Story = {
  render: (args) => (
    <ElevatedButton {...args}>Elevated</ElevatedButton>
  )
}

export const WithIcon: Story = {
  render: ({...rest}) => {
    const Icon = (
      <FilledIcon>home</FilledIcon>
    )

    return (
      <ElevatedButton
        icon={Icon}
        {...rest}
      >
        Elevated
      </ElevatedButton>)
  }
}