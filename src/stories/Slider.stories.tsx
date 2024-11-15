import {Meta, StoryObj} from "@storybook/react";
import {Slider} from "../index";

const meta: Meta = {
  title: 'Form/Slider',
  component: Slider,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  render: () => (
    <div>
      <Slider max={200} min={0} value={0}></Slider>
    </div>
  )
}