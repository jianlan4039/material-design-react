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

export const WithSvgIcon: Story = {
  render: () => {
    const Icon = (
      <FilledIcon>home</FilledIcon>
    )

    const TrailIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
      </svg>
    )

    return (
      <ElevatedButton
        icon={Icon}
        // trailingIcon={TrailIcon}
      >
        Elevated
      </ElevatedButton>)
  }
}