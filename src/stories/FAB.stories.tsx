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
  render: () => {
    return <FAB><FilledIcon>add</FilledIcon></FAB>
  }
}

export const Primary: Story = {
  render: () => {
    return <FAB theme={'primary'}><FilledIcon>add</FilledIcon></FAB>
  }
}

export const Secondary: Story = {
  render: () => {
    return <FAB theme={'secondary'}><FilledIcon>add</FilledIcon></FAB>
  }
}

export const Tertiary: Story = {
  render: () => {
    return <FAB theme={'tertiary'}><FilledIcon>add</FilledIcon></FAB>
  }
}
