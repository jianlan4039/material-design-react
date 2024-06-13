import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import CircularProgress from "../components/Progress/CircularProgress";

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  title: 'Common/CircularProgress',
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

export const FourColor: Story = {
  render: () => {
    return (
      <CircularProgress indeterminate fourColor></CircularProgress>
    )
  }
}