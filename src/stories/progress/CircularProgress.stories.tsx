import {Meta, StoryObj} from "@storybook/react";
import {CircularProgress} from "../../index";

const meta:Meta = {
  title: "Progress/CircularProgress",
  component: CircularProgress,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Indeterminate: Story = {
  render: () => {
    return (
      <CircularProgress
        indeterminate={true}
      ></CircularProgress>
    )
  }
}

export const SetWithValue: Story = {
  render: () => {
    return (
      <CircularProgress
        value={0.4}
        max={1}
      ></CircularProgress>
    )
  }
}

export const FourColor: Story = {
  render: () => {
    return (
      <CircularProgress
        fourColor={true}
        indeterminate={true}
      ></CircularProgress>
    )
  }
}