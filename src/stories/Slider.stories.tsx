import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Slider from "../components/Slider/Slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'Button/Slider',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => {
    return (
      <Slider {...args}></Slider>
    )
  }
}