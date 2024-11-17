import {Meta, StoryObj} from "@storybook/react";
import {LinearProgress} from "../../index";

const meta: Meta = {
  title: 'Progress/Linear Progress',
  component: LinearProgress,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Indeterminate: Story = {
  args: {
    indeterminate: true
  }
}

export const SetWithValue: Story = {
  args: {
    value: 0.3,
    max: 1
  }
}

export const FourColor: Story = {
  args: {
    indeterminate: true,
    fourColor: true
  }
}