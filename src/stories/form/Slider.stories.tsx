import {Meta, StoryObj} from "@storybook/react";
import {Slider} from "../../index";

const meta: Meta = {
  title: 'Form/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: "centered"
  }
}

export default meta;
type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  args: {
    min: 0,
    max: 100,
    onChange: (value: number) => {
      console.log(value)
    },
    onRangeChange: (values: number[]) => {
      console.log(values)
    }
  }
}