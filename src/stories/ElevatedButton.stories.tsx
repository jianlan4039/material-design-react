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
  render: ({label = 'Elevated', ...rest}) => (
    <ElevatedButton label={label} {...rest}></ElevatedButton>
  )
}

export const WithIcon: Story = {
  render: ({label = "Elevated", ...rest}) => {
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

export const WithHref: Story = {
  render: ({href = 'https://cn.bing.com', target = '_blank', label = "Elevated"}) => {
    const Icon = (
      <FilledIcon>home</FilledIcon>
    )

    return (
      <ElevatedButton
        href={href}
        target={target}
        icon={Icon}
      >
        Elevated
      </ElevatedButton>
    )
  }
}