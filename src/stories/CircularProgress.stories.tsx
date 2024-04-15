import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import CircularProgress from "../components/Progress/CirclarProgress";

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  title: 'Progress/CircularProgress',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Determinate: Story = {
  render: ({value = 0.35}) => {

    return (
      <CircularProgress value={value}></CircularProgress>
    )
  }
}

export const Indeterminate: Story = {
  render: () => {
    return (
      <CircularProgress indeterminate></CircularProgress>
    )
  }
}