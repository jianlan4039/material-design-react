import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import FAB from "../components/FAB/FAB";
import {FilledIcon} from "../icons";

const meta: Meta<typeof FAB> = {
  component: FAB,
  title: 'FAB/FAB',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FAB>;

export const Default: Story = {
  render: (args) => {
    return <FAB {...args}><FilledIcon>add</FilledIcon></FAB>
  }
}

export const Primary: Story = {
  render: ({size, variant = "primary",...rest}) => {
    return <FAB size={size} variant={variant} {...rest}><FilledIcon>add</FilledIcon></FAB>
  }
}

export const Secondary: Story = {
  render: ({size, variant = 'secondary', ...rest}) => {
    return <FAB size={size} variant={variant} {...rest}><FilledIcon>add</FilledIcon></FAB>
  }
}

export const Tertiary: Story = {
  render: ({size, variant = 'tertiary', ...rest}) => {
    return <FAB size={size} variant={variant} {...rest}><FilledIcon>add</FilledIcon></FAB>
  }
}
