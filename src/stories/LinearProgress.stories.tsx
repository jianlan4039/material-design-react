import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import LinearProgress from "../components/Progress/LinearProgress";

const meta: Meta<typeof LinearProgress> = {
  component: LinearProgress,
  title: 'Form/LinearProgress',
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Default: Story = {
  render: (args) => {
    return (
      <LinearProgress value={0.2}></LinearProgress>
    )
  }
}

export const WithBuffer: Story = {
  render: (args) => {
    return (
      <LinearProgress value={0.2} buffer={0.5}></LinearProgress>
    )
  }
}

export const Indeterminate: Story = {
  render: (args) => {
    return (
      <LinearProgress indeterminate></LinearProgress>
    )
  }
}

export const IndeterminateFourColor: Story = {
  render: (args) => {
    return (
      <LinearProgress indeterminate fourColor></LinearProgress>
    )
  }
}